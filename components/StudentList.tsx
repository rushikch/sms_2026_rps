'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRole } from '@/hooks/useRole'

type Student = {
  id: string
  name: string
  class: string
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([])
  const [filterClass, setFilterClass] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState('')
  const [newClass, setNewClass] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const { role } = useRole()
  const supabase = createClient()

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    const { data } = await supabase.from('students').select('*')
    setStudents(data || [])
  }

  const addStudent = async () => {
    await supabase.from('students').insert({ name: newName, class: newClass })
    setNewName('')
    setNewClass('')
    setShowAdd(false)
    fetchStudents()
  }

  const updateStudent = async () => {
    if (editingId) {
      await supabase.from('students').update({ name: newName, class: newClass }).eq('id', editingId)
      setEditingId(null)
      setNewName('')
      setNewClass('')
      fetchStudents()
    }
  }

  const deleteStudent = async (id: string) => {
    if (role === 'superadmin') {
      await supabase.from('students').delete().eq('id', id)
      fetchStudents()
    }
  }

  const filteredStudents = filterClass ? students.filter(s => s.class === filterClass) : students
  const classes = Array.from(new Set(students.map(s => s.class)))

  return (
    <div className="p-4">
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
          <input placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} className="border p-1 mr-2" />
          <input placeholder="Class" value={newClass} onChange={e => setNewClass(e.target.value)} className="border p-1 mr-2" />
          <button onClick={addStudent} className="bg-green-500 text-white p-1 mr-2">Save</button>
          <button onClick={() => setShowAdd(false)} className="bg-gray-500 text-white p-1">Cancel</button>
        </div>
      )}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(s => (
            <tr key={s.id}>
              {editingId === s.id ? (
                <>
                  <td className="border p-2"><input value={newName} onChange={e => setNewName(e.target.value)} className="border p-1" /></td>
                  <td className="border p-2"><input value={newClass} onChange={e => setNewClass(e.target.value)} className="border p-1" /></td>
                  <td className="border p-2">
                    <button onClick={updateStudent} className="bg-green-500 text-white p-1 mr-2">Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white p-1">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-2">{s.name}</td>
                  <td className="border p-2">{s.class}</td>
                  <td className="border p-2">
                    {(role === 'admin' || role === 'superadmin') && <button onClick={() => { setEditingId(s.id); setNewName(s.name); setNewClass(s.class) }} className="bg-yellow-500 text-white p-1 mr-2">Edit</button>}
                    {role === 'superadmin' && <button onClick={() => deleteStudent(s.id)} className="bg-red-500 text-white p-1">Delete</button>}
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