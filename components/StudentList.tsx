'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRole } from '@/hooks/useRole'
import toast, { Toaster } from 'react-hot-toast'
import { UserPlus, Edit, Trash2, ArrowLeft, Eye } from 'lucide-react'
import Link from 'next/link'

type Student = {
  id: string
  name: string
  class: string
  parent_name: string
  phone: string
  address: string
  date_of_birth: string
  date_of_joining: string
  other_details: string
  aadhar_number: string
}

const classes = ['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([])
  const [filterClass, setFilterClass] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    class: '',
    parent_name: '',
    phone: '',
    address: '',
    date_of_birth: '',
    date_of_joining: '',
    other_details: '',
    aadhar_number: ''
  })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { role } = useRole()
  const supabase = createClient()

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    const { data, error } = await supabase.from('students').select('*')
    if (error) {
      toast.error('Failed to fetch students: ' + error.message)
    } else {
      setStudents(data || [])
    }
  }

  const addStudent = async () => {
    setLoading(true)
    const { error } = await supabase.from('students').insert(newStudent)
    if (error) {
      toast.error('Failed to add student: ' + error.message)
    } else {
      toast.success('Student added successfully!')
      setNewStudent({
        name: '',
        class: '',
        parent_name: '',
        phone: '',
        address: '',
        date_of_birth: '',
        date_of_joining: '',
        other_details: '',
        aadhar_number: ''
      })
      setShowAdd(false)
      fetchStudents()
    }
    setLoading(false)
  }

  const updateStudent = async () => {
    if (editingId) {
      setLoading(true)
      const { error } = await supabase.from('students').update(newStudent).eq('id', editingId)
      if (error) {
        toast.error('Failed to update student: ' + error.message)
      } else {
        toast.success('Student updated successfully!')
        setEditingId(null)
        setNewStudent({
          name: '',
          class: '',
          parent_name: '',
          phone: '',
          address: '',
          date_of_birth: '',
          date_of_joining: '',
          other_details: '',
          aadhar_number: ''
        })
        fetchStudents()
      }
      setLoading(false)
    }
  }

  const deleteStudent = async (id: string) => {
    if (role === 'superadmin') {
      setLoading(true)
      const { error } = await supabase.from('students').delete().eq('id', id)
      if (error) {
        toast.error('Failed to delete student: ' + error.message)
      } else {
        toast.success('Student deleted successfully!')
        fetchStudents()
      }
      setLoading(false)
    }
  }

  const filteredStudents = filterClass ? students.filter(s => s.class === filterClass) : students

  return (
    <div className="p-4">
      <Toaster />
      <div className="mb-4">
        <Link href="/" className="btn btn-outline inline-flex items-center">
          <ArrowLeft size={16} className="mr-2" />
          Back to Dashboard
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      <div className="mb-4">
        <label className="mr-2">Filter by Class:</label>
        <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="border p-1">
          <option value="">All</option>
          {classes.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <button onClick={() => setShowAdd(true)} className="bg-blue-500 text-white p-2 mb-4">Add Student</button>
      {showAdd && (
        <div className="mb-4">
          <input placeholder="Name" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="border p-1 mr-2" />
          <select value={newStudent.class} onChange={e => setNewStudent({...newStudent, class: e.target.value})} className="border p-1 mr-2">
            <option value="">Select Class</option>
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input placeholder="Parent Name" value={newStudent.parent_name} onChange={e => setNewStudent({...newStudent, parent_name: e.target.value})} className="border p-1 mr-2" />
          <input placeholder="Phone" value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} className="border p-1 mr-2" />
          <input placeholder="Address" value={newStudent.address} onChange={e => setNewStudent({...newStudent, address: e.target.value})} className="border p-1 mr-2" />
          <input type="date" placeholder="Date of Birth" value={newStudent.date_of_birth} onChange={e => setNewStudent({...newStudent, date_of_birth: e.target.value})} className="border p-1 mr-2" />
          <input type="date" placeholder="Date of Joining" value={newStudent.date_of_joining} onChange={e => setNewStudent({...newStudent, date_of_joining: e.target.value})} className="border p-1 mr-2" />
          <input placeholder="Aadhar Number" value={newStudent.aadhar_number} onChange={e => setNewStudent({...newStudent, aadhar_number: e.target.value})} className="border p-1 mr-2" />
          <textarea placeholder="Other Details" value={newStudent.other_details} onChange={e => setNewStudent({...newStudent, other_details: e.target.value})} className="border p-1 mr-2" />
          <button onClick={addStudent} className="bg-green-500 text-white p-1 mr-2" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
          <button onClick={() => setShowAdd(false)} className="bg-gray-500 text-white p-1">Cancel</button>
        </div>
      )}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Parent Name</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(s => (
            <tr key={s.id}>
              {editingId === s.id ? (
                <>
                  <td className="border p-2"><input value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="border p-1" /></td>
                  <td className="border p-2"><select value={newStudent.class} onChange={e => setNewStudent({...newStudent, class: e.target.value})} className="border p-1">
                    {classes.map(c => <option key={c} value={c}>{c}</option>)}
                  </select></td>
                  <td className="border p-2"><input value={newStudent.parent_name} onChange={e => setNewStudent({...newStudent, parent_name: e.target.value})} className="border p-1" /></td>
                  <td className="border p-2"><input value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} className="border p-1" /></td>
                  <td className="border p-2">
                    <button onClick={updateStudent} className="bg-green-500 text-white p-1 mr-2" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white p-1">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-2">{s.name}</td>
                  <td className="border p-2">{s.class}</td>
                  <td className="border p-2">{s.parent_name}</td>
                  <td className="border p-2">{s.phone}</td>
                  <td className="border p-2">
                    <Link href={`/fees?studentId=${s.id}`} className="bg-blue-500 text-white p-1 mr-2 rounded inline-flex items-center">
                      <Eye size={14} className="mr-1" />
                      View Fees
                    </Link>
                    {(role === 'admin' || role === 'superadmin') && <button onClick={() => { if (window.confirm('Are you sure you want to edit this student?')) { setEditingId(s.id); setNewStudent(s) } }} className="bg-yellow-500 text-white p-1 mr-2">Edit</button>}
                    {role === 'superadmin' && <button onClick={() => { if (window.confirm('Are you sure you want to delete this student? This action cannot be undone.')) deleteStudent(s.id) }} className="bg-red-500 text-white p-1" disabled={loading}>{loading ? 'Deleting...' : 'Delete'}</button>}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}