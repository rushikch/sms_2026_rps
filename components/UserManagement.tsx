'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRole } from '@/hooks/useRole'
import toast, { Toaster } from 'react-hot-toast'
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

type User = {
  id: string
  email: string
  role: 'superadmin' | 'admin' | 'user'
  created_at: string
}

const roles = ['superadmin', 'admin', 'user']

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const { role, loading: roleLoading } = useRole()
  const supabase = createClient()

  // Form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userRole, setUserRole] = useState<'superadmin' | 'admin' | 'user'>('user')
  const [editingRole, setEditingRole] = useState<'superadmin' | 'admin' | 'user'>('user')

  useEffect(() => {
    if (role === 'superadmin') {
      fetchUsers()
    }
  }, [role])

  const fetchUsers = async () => {
    try {
      // Get all auth users
      const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers()

      if (authError) {
        toast.error('Failed to fetch users: ' + authError.message)
        return
      }

      // Get all user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')

      if (rolesError) {
        toast.error('Failed to fetch user roles: ' + rolesError.message)
        return
      }

      // Combine users with their roles
      const combinedUsers = authUsers.map(authUser => {
        const userRoleData = rolesData?.find(r => r.user_id === authUser.id)
        return {
          id: authUser.id,
          email: authUser.email || '',
          role: userRoleData?.role || 'user',
          created_at: authUser.created_at || ''
        }
      })

      setUsers(combinedUsers)
    } catch (error) {
      toast.error('Error fetching users: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  // Check if user is SuperAdmin
  if (roleLoading) {
    return <div className="p-4">Loading...</div>
  }

  if (role !== 'superadmin') {
    return (
      <div className="p-4">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
          <p className="text-gray-600">Only Super Admin can manage users.</p>
          <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const addUser = async () => {
    if (!email || !password) {
      toast.error('Please fill all required fields')
      return
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      // Create user in auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      })

      if (authError) {
        toast.error('Failed to create user: ' + authError.message)
        setLoading(false)
        return
      }

      if (!authData.user) {
        toast.error('Failed to create user')
        setLoading(false)
        return
      }

      // Assign role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: userRole
        })

      if (roleError) {
        toast.error('Failed to assign role: ' + roleError.message)
        setLoading(false)
        return
      }

      toast.success('User created successfully!')
      setUsers([...users, {
        id: authData.user.id,
        email,
        role: userRole,
        created_at: new Date().toISOString()
      }])
      resetForm()
      setShowAdd(false)
    } catch (error) {
      toast.error('Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
    setLoading(false)
  }

  const updateUserRole = async () => {
    if (!editingId) return

    setLoading(true)
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: editingRole })
        .eq('user_id', editingId)

      if (error) {
        toast.error('Failed to update role: ' + error.message)
      } else {
        toast.success('User role updated successfully!')
        const updatedUsers = users.map(u =>
          u.id === editingId ? { ...u, role: editingRole } : u
        )
        setUsers(updatedUsers)
        setEditingId(null)
      }
    } catch (error) {
      toast.error('Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
    setLoading(false)
  }

  const deleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return
    }

    setLoading(true)
    try {
      // Delete from user_roles
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', id)

      // Delete auth user
      const { error } = await supabase.auth.admin.deleteUser(id)

      if (error) {
        toast.error('Failed to delete user: ' + error.message)
      } else {
        toast.success('User deleted successfully!')
        setUsers(users.filter(u => u.id !== id))
      }
    } catch (error) {
      toast.error('Error: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
    setLoading(false)
  }

  const resetForm = () => {
    setEmail('')
    setPassword('')
    setUserRole('user')
    setShowPassword(false)
  }

  const startEdit = (user: User) => {
    setEditingId(user.id)
    setEditingRole(user.role)
  }

  return (
    <div className="p-4">
      <Toaster />
      <div className="mb-4">
        <Link href="/" className="btn btn-outline inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Add User Button */}
      <div className="mb-4">
        <button
          onClick={() => { setShowAdd(true); resetForm(); setEditingId(null) }}
          className="bg-blue-500 text-white p-2 inline-flex items-center rounded hover:bg-blue-600"
        >
          <Plus size={16} className="mr-2" />
          Add New User
        </button>
      </div>

      {/* Add User Form */}
      {showAdd && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">Add New User</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="user@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <div className="flex gap-2">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="flex-1 border p-2 rounded"
                  placeholder="Enter password (min 6 characters)"
                  required
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="bg-gray-300 p-2 rounded hover:bg-gray-400"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
              <select
                value={userRole}
                onChange={e => setUserRole(e.target.value as 'superadmin' | 'admin' | 'user')}
                className="w-full border p-2 rounded"
                required
              >
                <option value="user">User (View Only)</option>
                <option value="admin">Admin (Add/Edit)</option>
                <option value="superadmin">Super Admin (Full Access)</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={addUser}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create User'}
            </button>
            <button
              onClick={() => { setShowAdd(false); resetForm() }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2 text-left">Email</th>
              <th className="border p-2 text-left">Role</th>
              <th className="border p-2 text-left">Created</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                {editingId === user.id ? (
                  <>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">
                      <select
                        value={editingRole}
                        onChange={e => setEditingRole(e.target.value as 'superadmin' | 'admin' | 'user')}
                        className="border p-1 rounded"
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                      </select>
                    </td>
                    <td className="border p-2">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="border p-2">
                      <button
                        onClick={updateUserRole}
                        disabled={loading}
                        className="bg-green-500 text-white p-1 mr-2 rounded disabled:opacity-50"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="bg-gray-500 text-white p-1 rounded"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === 'superadmin'
                          ? 'bg-purple-100 text-purple-800'
                          : user.role === 'admin'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </span>
                    </td>
                    <td className="border p-2">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="border p-2 space-x-2">
                      <button
                        onClick={() => startEdit(user)}
                        className="bg-yellow-500 text-white p-1 rounded inline-flex items-center hover:bg-yellow-600"
                        title="Edit role"
                      >
                        <Edit size={14} className="mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user.id)}
                        disabled={loading}
                        className="bg-red-500 text-white p-1 rounded inline-flex items-center hover:bg-red-600 disabled:opacity-50"
                        title="Delete user"
                      >
                        <Trash2 size={14} className="mr-1" /> Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found. Create a new user to get started.
        </div>
      )}

      {/* User Count */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-gray-600">
          Total Users: <span className="font-semibold text-blue-600">{users.length}</span>
        </p>
      </div>
    </div>
  )
}