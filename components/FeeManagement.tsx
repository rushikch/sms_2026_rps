'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRole } from '@/hooks/useRole'
import Receipt from './Receipt'
import toast, { Toaster } from 'react-hot-toast'
import { ArrowLeft, X } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type Student = { id: string; name: string; class: string; parent_name: string }
type Fee = { id: string; student_id: string; amount: number; date: string; transaction_id: string; student?: Student }

const classes = ['Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']

export default function FeeManagement() {
  const [fees, setFees] = useState<Fee[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [searchName, setSearchName] = useState('')
  const [searchClass, setSearchClass] = useState('')
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showReceipt, setShowReceipt] = useState<Fee | null>(null)
  const [loading, setLoading] = useState(false)
  const { role } = useRole()
  const supabase = createClient()
  const searchParams = useSearchParams()
  const studentIdFilter = searchParams.get('studentId')

  useEffect(() => {
    fetchFees()
    fetchStudents()
  }, [])

  const fetchFees = async () => {
    let query = supabase.from('fees').select('*, student:students(name, class)')
    if (studentIdFilter) {
      query = query.eq('student_id', studentIdFilter)
    }
    const { data } = await query
    setFees(data || [])
  }

  const fetchStudents = async () => {
    const { data } = await supabase.from('students').select('id, name, class, parent_name')
    setStudents(data || [])
  }

  const searchStudents = () => {
    const filtered = students.filter(s =>
      (searchName ? s.name.toLowerCase().includes(searchName.toLowerCase()) : true) &&
      (searchClass ? s.class === searchClass : true)
    )
    setFilteredStudents(filtered)
  }

  const addFee = async () => {
    if (!selectedStudent) return
    setLoading(true)
    try {
      const transactionId = crypto.randomUUID()
      const { data } = await supabase.from('fees').insert({
        student_id: selectedStudent.id,
        amount: parseFloat(amount),
        date,
        transaction_id: transactionId
      }).select('*, student:students(name, class)').single()
      if (data) {
        setFees([...fees, data])
        setShowReceipt(data)
        toast.success('Fee added successfully!')
      }
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
    setShowAdd(false)
    setSelectedStudent(null)
    setAmount('')
  }

  const updateFee = async () => {
    if (editingId) {
      setLoading(true)
      try {
        await supabase.from('fees').update({ amount: parseFloat(amount), date }).eq('id', editingId)
        toast.success('Fee updated successfully!')
        fetchFees()
        setEditingId(null)
        setAmount('')
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
  }

  const deleteFee = async (id: string) => {
    if (role === 'superadmin') {
      setLoading(true)
      try {
        await supabase.from('fees').delete().eq('id', id)
        toast.success('Fee deleted successfully!')
        fetchFees()
      } catch (error: any) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
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
      <h1 className="text-2xl font-bold mb-4">
        Fee Management
        {studentIdFilter && fees.length > 0 && ` for ${fees[0].student?.name}`}
        {studentIdFilter && (
          <Link href="/fees" className="ml-4 btn btn-outline inline-flex items-center text-sm">
            <X size={14} className="mr-1" />
            Clear Filter
          </Link>
        )}
      </h1>
      <button onClick={() => setShowAdd(true)} className="bg-blue-500 text-white p-2 mb-4">Add Fee Payment</button>
      {showAdd && (
        <div className="mb-4 p-4 border rounded bg-gray-50">
          <h2 className="text-lg mb-2">Search Student</h2>
          <div className="flex gap-4 mb-4">
            <input placeholder="Student Name" value={searchName} onChange={e => setSearchName(e.target.value)} className="border p-2 flex-1" />
            <select value={searchClass} onChange={e => setSearchClass(e.target.value)} className="border p-2">
              <option value="">All Classes</option>
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={searchStudents} className="bg-gray-500 text-white p-2">Search</button>
          </div>
          {filteredStudents.length > 0 && (
            <div className="mb-4">
              <h3 className="text-md mb-2">Select Student</h3>
              <div className="max-h-40 overflow-y-auto border p-2">
                {filteredStudents.map(s => (
                  <div key={s.id} className="flex justify-between items-center p-2 border-b">
                    <div>
                      <p><strong>{s.name}</strong> ({s.class})</p>
                      <p>Parent: {s.parent_name}</p>
                    </div>
                    <button onClick={() => setSelectedStudent(s)} className="bg-green-500 text-white p-1">Select</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {selectedStudent && (
            <div className="mb-4">
              <h3 className="text-md mb-2">Selected: {selectedStudent.name} ({selectedStudent.class}) - Parent: {selectedStudent.parent_name}</h3>
              <div className="flex gap-4">
                <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} className="border p-2" required />
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-2" required />
                <button onClick={addFee} disabled={loading} className="bg-green-500 text-white p-2 disabled:opacity-50">{loading ? 'Adding...' : 'Add Fee'}</button>
                <button onClick={() => { setShowAdd(false); setSelectedStudent(null); setFilteredStudents([]); setSearchName(''); setSearchClass('') }} className="bg-gray-500 text-white p-2">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
      {showReceipt && (
        <Receipt fee={showReceipt} student={students.find(s => s.id === showReceipt.student_id)!} onClose={() => setShowReceipt(null)} />
      )}
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Student</th>
            <th className="border p-2">Class</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Transaction ID</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fees.map(f => (
            <tr key={f.id}>
              {editingId === f.id ? (
                <>
                  <td className="border p-2">{f.student?.name}</td>
                  <td className="border p-2">{f.student?.class}</td>
                  <td className="border p-2"><input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="border p-1" /></td>
                  <td className="border p-2"><input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-1" /></td>
                  <td className="border p-2">{f.transaction_id}</td>
                  <td className="border p-2">
                    <button onClick={updateFee} disabled={loading} className="bg-green-500 text-white p-1 mr-2 disabled:opacity-50">{loading ? 'Saving...' : 'Save'}</button>
                    <button onClick={() => setEditingId(null)} className="bg-gray-500 text-white p-1">Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="border p-2">{f.student?.name}</td>
                  <td className="border p-2">{f.student?.class}</td>
                  <td className="border p-2">{f.amount}</td>
                  <td className="border p-2">{f.date}</td>
                  <td className="border p-2">{f.transaction_id}</td>
                  <td className="border p-2">
                    {role === 'superadmin' && <button onClick={() => { setEditingId(f.id); setAmount(f.amount.toString()); setDate(f.date) }} className="bg-yellow-500 text-white p-1 mr-2">Edit</button>}
                    {role === 'superadmin' && <button onClick={() => deleteFee(f.id)} disabled={loading} className="bg-red-500 text-white p-1 disabled:opacity-50">{loading ? 'Deleting...' : 'Delete'}</button>}
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