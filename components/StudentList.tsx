'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRole } from '@/hooks/useRole'
import Receipt from './Receipt'
import toast, { Toaster } from 'react-hot-toast'
import { UserPlus, Edit, Trash2, ArrowLeft, Eye, X } from 'lucide-react'
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

type Fee = {
  id: string
  student_id: string
  amount: number
  date: string
  transaction_id: string
}

const classes = ['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([])
  const [filterClass, setFilterClass] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [viewMode, setViewMode] = useState<'all' | 'byClass'>('all')
  const [selectedClassForView, setSelectedClassForView] = useState<string | null>(null)
  const [showFeesModal, setShowFeesModal] = useState(false)
  const [selectedStudentForFees, setSelectedStudentForFees] = useState<Student | null>(null)
  const [studentFees, setStudentFees] = useState<Fee[]>([])
  const [showAddFeeForm, setShowAddFeeForm] = useState(false)
  const [feeAmount, setFeeAmount] = useState('')
  const [feeDate, setFeeDate] = useState(new Date().toISOString().split('T')[0])
  const [showReceipt, setShowReceipt] = useState<Fee | null>(null)
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
    // Create a clean object without id for insertion
    const studentData = {
      name: newStudent.name,
      class: newStudent.class,
      parent_name: newStudent.parent_name,
      phone: newStudent.phone,
      address: newStudent.address,
      date_of_birth: newStudent.date_of_birth,
      date_of_joining: newStudent.date_of_joining,
      other_details: newStudent.other_details,
      aadhar_number: newStudent.aadhar_number
    }
    
    const { error } = await supabase.from('students').insert(studentData)
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

  const fetchStudentFees = async (studentId: string) => {
    const { data, error } = await supabase
      .from('fees')
      .select('*')
      .eq('student_id', studentId)
      .order('date', { ascending: false })
    
    if (error) {
      toast.error('Failed to fetch fees: ' + error.message)
    } else {
      setStudentFees(data || [])
    }
  }

  const openFeesModal = (student: Student) => {
    setSelectedStudentForFees(student)
    setShowFeesModal(true)
    setShowAddFeeForm(false)
    fetchStudentFees(student.id)
  }

  const closeFeesModal = () => {
    setShowFeesModal(false)
    setSelectedStudentForFees(null)
    setStudentFees([])
    setShowAddFeeForm(false)
    setFeeAmount('')
    setFeeDate(new Date().toISOString().split('T')[0])
  }

  const addFee = async () => {
    if (!selectedStudentForFees || !feeAmount || !feeDate) {
      toast.error('Please fill all fields')
      return
    }

    setLoading(true)
    const transactionId = crypto.randomUUID()
    const { data, error } = await supabase.from('fees').insert({
      student_id: selectedStudentForFees.id,
      amount: parseFloat(feeAmount),
      date: feeDate,
      transaction_id: transactionId
    }).select('*').single()

    if (error) {
      toast.error('Failed to add fee: ' + error.message)
    } else {
      toast.success('Fee added successfully!')
      if (data) {
        setShowReceipt(data)
      }
      setFeeAmount('')
      setFeeDate(new Date().toISOString().split('T')[0])
      setShowAddFeeForm(false)
      fetchStudentFees(selectedStudentForFees.id)
    }
    setLoading(false)
  }

  const deleteFee = async (feeId: string) => {
    if (role === 'superadmin') {
      setLoading(true)
      const { error } = await supabase.from('fees').delete().eq('id', feeId)
      if (error) {
        toast.error('Failed to delete fee: ' + error.message)
      } else {
        toast.success('Fee deleted successfully!')
        if (selectedStudentForFees) {
          fetchStudentFees(selectedStudentForFees.id)
        }
      }
      setLoading(false)
    }
  }

  const filteredStudents = filterClass ? students.filter(s => s.class === filterClass) : students

  const getStudentsByClass = (className: string) => students.filter(s => s.class === className)
  const getClassStats = () => {
    const stats: { [key: string]: number } = {}
    classes.forEach(c => {
      stats[c] = students.filter(s => s.class === c).length
    })
    return stats
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
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>

      {/* View Mode Toggle */}
      <div className="mb-6 flex gap-4">
        <button
          onClick={() => { setViewMode('all'); setSelectedClassForView(null) }}
          className={`px-4 py-2 rounded font-semibold ${viewMode === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          All Students
        </button>
        <button
          onClick={() => setViewMode('byClass')}
          className={`px-4 py-2 rounded font-semibold ${viewMode === 'byClass' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}`}
        >
          Students by Class
        </button>
      </div>

      {/* View Mode: All Students */}
      {viewMode === 'all' && (
        <>
          <div className="mb-4">
            <label className="mr-2">Filter by Class:</label>
            <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="border p-1">
              <option value="">All</option>
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={() => { setShowAdd(true); setEditingId(null); setNewStudent({ name: '', class: '', parent_name: '', phone: '', address: '', date_of_birth: '', date_of_joining: '', other_details: '', aadhar_number: '' }) }} className="bg-blue-500 text-white p-2 mb-4">Add Student</button>
          {showAdd && (
            <div className="mb-4 p-4 border rounded bg-gray-50">
              <h3 className="font-bold mb-3">Add New Student</h3>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <input placeholder="Name" value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="border p-2 rounded" />
                <select value={newStudent.class} onChange={e => setNewStudent({...newStudent, class: e.target.value})} className="border p-2 rounded">
                  <option value="">Select Class</option>
                  {classes.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input placeholder="Parent Name" value={newStudent.parent_name} onChange={e => setNewStudent({...newStudent, parent_name: e.target.value})} className="border p-2 rounded" />
                <input placeholder="Phone" value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} className="border p-2 rounded" />
                <input placeholder="Address" value={newStudent.address} onChange={e => setNewStudent({...newStudent, address: e.target.value})} className="border p-2 rounded" />
                <input type="date" placeholder="Date of Birth" value={newStudent.date_of_birth} onChange={e => setNewStudent({...newStudent, date_of_birth: e.target.value})} className="border p-2 rounded" />
                <input type="date" placeholder="Date of Joining" value={newStudent.date_of_joining} onChange={e => setNewStudent({...newStudent, date_of_joining: e.target.value})} className="border p-2 rounded" />
                <input placeholder="Aadhar Number" value={newStudent.aadhar_number} onChange={e => setNewStudent({...newStudent, aadhar_number: e.target.value})} className="border p-2 rounded" />
                <textarea placeholder="Other Details" value={newStudent.other_details} onChange={e => setNewStudent({...newStudent, other_details: e.target.value})} className="border p-2 rounded col-span-2" />
              </div>
              <div className="flex gap-2">
                <button onClick={addStudent} className="bg-green-500 text-white p-2 rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                <button onClick={() => setShowAdd(false)} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
              </div>
            </div>
          )}
          <table className="w-full border rounded overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Class</th>
                <th className="border p-2">Parent Name</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(s => (
                <tr key={s.id} className="hover:bg-gray-50">
                  {editingId === s.id ? (
                    <>
                      <td className="border p-2"><input value={newStudent.name} onChange={e => setNewStudent({...newStudent, name: e.target.value})} className="border p-1 rounded w-full" /></td>
                      <td className="border p-2"><select value={newStudent.class} onChange={e => setNewStudent({...newStudent, class: e.target.value})} className="border p-1 rounded w-full">
                        {classes.map(c => <option key={c} value={c}>{c}</option>)}
                      </select></td>
                      <td className="border p-2"><input value={newStudent.parent_name} onChange={e => setNewStudent({...newStudent, parent_name: e.target.value})} className="border p-1 rounded w-full" /></td>
                      <td className="border p-2"><input value={newStudent.phone} onChange={e => setNewStudent({...newStudent, phone: e.target.value})} className="border p-1 rounded w-full" /></td>
                      <td className="border p-2">
                        <button onClick={updateStudent} className="bg-green-500 text-white p-1 mr-2 rounded" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
                        <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white p-1 rounded">Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border p-2">{s.name}</td>
                      <td className="border p-2">{s.class}</td>
                      <td className="border p-2">{s.parent_name}</td>
                      <td className="border p-2">{s.phone}</td>
                      <td className="border p-2">
                        <button onClick={() => openFeesModal(s)} className="bg-blue-500 text-white p-1 mr-2 rounded inline-flex items-center text-sm hover:bg-blue-600">
                          <Eye size={14} className="mr-1" />
                          Fees
                        </button>
                        {(role === 'admin' || role === 'superadmin') && <button onClick={() => { if (window.confirm('Are you sure you want to edit this student?')) { setEditingId(s.id); setNewStudent(s) } }} className="bg-yellow-500 text-white p-1 mr-2 rounded text-sm">Edit</button>}
                        {role === 'superadmin' && <button onClick={() => { if (window.confirm('Are you sure you want to delete this student?')) deleteStudent(s.id) }} className="bg-red-500 text-white p-1 rounded text-sm" disabled={loading}>{loading ? 'Del...' : 'Delete'}</button>}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* View Mode: Students by Class */}
      {viewMode === 'byClass' && !selectedClassForView && (
        <>
          <h2 className="text-xl font-bold mb-4">Select a Class</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {classes.map(c => {
              const count = getClassStats()[c]
              return (
                <button
                  key={c}
                  onClick={() => setSelectedClassForView(c)}
                  className="p-6 border-2 border-blue-400 rounded-lg hover:bg-blue-50 hover:border-blue-600 transition-all cursor-pointer"
                >
                  <div className="text-lg font-bold text-blue-600">{c}</div>
                  <div className="text-sm text-gray-600 mt-2">{count} student{count !== 1 ? 's' : ''}</div>
                </button>
              )
            })}
          </div>
        </>
      )}

      {/* View Mode: Students by Class - Selected Class View */}
      {viewMode === 'byClass' && selectedClassForView && (
        <>
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setSelectedClassForView(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 inline-flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Classes
            </button>
            <h2 className="text-2xl font-bold">{selectedClassForView}</h2>
            <span className="text-gray-600">({getStudentsByClass(selectedClassForView).length} students)</span>
          </div>
          
          {getStudentsByClass(selectedClassForView).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No students in this class yet.</p>
            </div>
          ) : (
            <table className="w-full border rounded overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Parent Name</th>
                  <th className="border p-2">Phone</th>
                  <th className="border p-2">Address</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getStudentsByClass(selectedClassForView).map(s => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="border p-2 font-semibold">{s.name}</td>
                    <td className="border p-2">{s.parent_name}</td>
                    <td className="border p-2">{s.phone}</td>
                    <td className="border p-2 text-sm">{s.address}</td>
                    <td className="border p-2">
                      <button onClick={() => openFeesModal(s)} className="bg-blue-500 text-white p-1 mr-2 rounded inline-flex items-center text-sm hover:bg-blue-600">
                        <Eye size={14} className="mr-1" />
                        Fees
                      </button>
                      {(role === 'admin' || role === 'superadmin') && <button onClick={() => { if (window.confirm('Are you sure you want to edit this student?')) { setEditingId(s.id); setNewStudent(s) } }} className="bg-yellow-500 text-white p-1 mr-2 rounded text-sm">Edit</button>}
                      {role === 'superadmin' && <button onClick={() => { if (window.confirm('Are you sure you want to delete this student?')) deleteStudent(s.id) }} className="bg-red-500 text-white p-1 rounded text-sm" disabled={loading}>{loading ? 'Del...' : 'Delete'}</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {/* Fees Modal */}
      {showFeesModal && selectedStudentForFees && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedStudentForFees.name}</h2>
                <p className="text-blue-100 text-sm">{selectedStudentForFees.class} | Parent: {selectedStudentForFees.parent_name}</p>
              </div>
              <button
                onClick={closeFeesModal}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Add Fee Button */}
              {!showAddFeeForm && (
                <button
                  onClick={() => setShowAddFeeForm(true)}
                  className="mb-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all font-semibold inline-flex items-center"
                >
                  <UserPlus size={16} className="mr-2" />
                  Add New Fee
                </button>
              )}

              {/* Add Fee Form */}
              {showAddFeeForm && (
                <div className="mb-6 p-4 border-2 border-green-300 rounded-lg bg-green-50">
                  <h3 className="font-bold mb-4 text-lg">Add Fee for {selectedStudentForFees.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">Amount (₹)</label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={feeAmount}
                        onChange={e => setFeeAmount(e.target.value)}
                        className="border p-2 rounded w-full"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">Date</label>
                      <input
                        type="date"
                        value={feeDate}
                        onChange={e => setFeeDate(e.target.value)}
                        className="border p-2 rounded w-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={addFee}
                      disabled={loading}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 font-semibold"
                    >
                      {loading ? 'Saving...' : 'Save Fee'}
                    </button>
                    <button
                      onClick={() => {
                        setShowAddFeeForm(false)
                        setFeeAmount('')
                        setFeeDate(new Date().toISOString().split('T')[0])
                      }}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Fees List */}
              <h3 className="font-bold text-lg mb-4">Fee History ({studentFees.length})</h3>
              {studentFees.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No fees recorded yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <table className="w-full border rounded">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border p-3 text-left">Date</th>
                        <th className="border p-3 text-left">Amount</th>
                        <th className="border p-3 text-left">Transaction ID</th>
                        <th className="border p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentFees.map(fee => (
                        <tr key={fee.id} className="hover:bg-gray-50">
                          <td className="border p-3">{fee.date}</td>
                          <td className="border p-3 font-semibold">₹{fee.amount}</td>
                          <td className="border p-3 text-sm text-gray-600">{fee.transaction_id}</td>
                          <td className="border p-3">
                            {role === 'superadmin' && (
                              <button
                                onClick={() => {
                                  if (window.confirm('Are you sure you want to delete this fee?')) {
                                    deleteFee(fee.id)
                                  }
                                }}
                                disabled={loading}
                                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Total Fees */}
              {studentFees.length > 0 && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-lg font-bold text-blue-900">
                    Total Fees Collected: ₹{studentFees.reduce((sum, fee) => sum + fee.amount, 0)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {showReceipt && selectedStudentForFees && (
        <Receipt
          fee={showReceipt}
          student={selectedStudentForFees}
          onClose={() => setShowReceipt(null)}
        />
      )}
    </div>
  )
}