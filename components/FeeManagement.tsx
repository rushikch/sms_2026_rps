'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRole } from '@/hooks/useRole'
import Receipt from './Receipt'
import toast, { Toaster } from 'react-hot-toast'
import { ArrowLeft, X, Download } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type Student = { id: string; student_id: string; name: string; class: string; parent_name: string }
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

  // Filter states for fees table
  const [filterStudentName, setFilterStudentName] = useState('')
  const [filterClass, setFilterClass] = useState('')
  const [filterTransactionId, setFilterTransactionId] = useState('')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')
  const [filterAmountMin, setFilterAmountMin] = useState('')
  const [filterAmountMax, setFilterAmountMax] = useState('')

  useEffect(() => {
    fetchFees()
    fetchStudents()
  }, [])

  const fetchFees = async () => {
    let query = supabase.from('fees').select('*, student:students(name, class, student_id)')
    if (studentIdFilter) {
      query = query.eq('student_id', studentIdFilter)
    }
    const { data, error } = await query
    if (error) {
      toast.error('Failed to fetch fees: ' + error.message)
    } else {
      setFees(data || [])
    }
  }

  const fetchStudents = async () => {
    const { data, error } = await supabase.from('students').select('id, name, class, parent_name, student_id')
    if (error) {
      toast.error('Failed to fetch students: ' + error.message)
    } else {
      setStudents(data || [])
      setFilteredStudents(data || [])
    }
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
    const transactionId = crypto.randomUUID()
    const { data, error } = await supabase.from('fees').insert({
      student_id: selectedStudent.id,
      amount: parseFloat(amount),
      date,
      transaction_id: transactionId
    }).select('*, student:students(name, class, student_id)').single()
    if (error) {
      toast.error('Failed to add fee: ' + error.message)
    } else if (data) {
      setFees([...fees, data])
      setShowReceipt(data)
      toast.success('Fee added successfully!')
    }
    setLoading(false)
    setShowAdd(false)
    setSelectedStudent(null)
    setAmount('')
  }

  const updateFee = async () => {
    if (editingId) {
      setLoading(true)
      const { error } = await supabase.from('fees').update({ amount: parseFloat(amount), date }).eq('id', editingId)
      if (error) {
        toast.error('Failed to update fee: ' + error.message)
      } else {
        toast.success('Fee updated successfully!')
        fetchFees()
        setEditingId(null)
        setAmount('')
      }
      setLoading(false)
    }
  }

  const deleteFee = async (id: string) => {
    if (role === 'superadmin') {
      setLoading(true)
      const { error } = await supabase.from('fees').delete().eq('id', id)
      if (error) {
        toast.error('Failed to delete fee: ' + error.message)
      } else {
        toast.success('Fee deleted successfully!')
        fetchFees()
      }
      setLoading(false)
    }
  }

  const getFilteredFees = () => {
    return fees.filter(fee => {
      const matchesStudentName = !filterStudentName || 
        (fee.student?.name && fee.student.name.toLowerCase().includes(filterStudentName.toLowerCase()))
      const matchesClass = !filterClass || (fee.student?.class === filterClass)
      const matchesTransactionId = !filterTransactionId || 
        fee.transaction_id.toLowerCase().includes(filterTransactionId.toLowerCase())
      const matchesDateFrom = !filterDateFrom || fee.date >= filterDateFrom
      const matchesDateTo = !filterDateTo || fee.date <= filterDateTo
      const matchesAmountMin = !filterAmountMin || fee.amount >= parseFloat(filterAmountMin)
      const matchesAmountMax = !filterAmountMax || fee.amount <= parseFloat(filterAmountMax)

      return matchesStudentName && matchesClass && matchesTransactionId && 
             matchesDateFrom && matchesDateTo && matchesAmountMin && matchesAmountMax
    })
  }

  const clearFilters = () => {
    setFilterStudentName('')
    setFilterClass('')
    setFilterTransactionId('')
    setFilterDateFrom('')
    setFilterDateTo('')
    setFilterAmountMin('')
    setFilterAmountMax('')
  }

  const downloadFeesCSV = () => {
    const filteredFees = getFilteredFees()
    const headers = ['Transaction ID', 'Student ID', 'Student Name', 'Class', 'Amount', 'Date']
    const csvData = filteredFees.map(fee => [
      fee.transaction_id,
      fee.student?.student_id || '',
      fee.student?.name || '',
      fee.student?.class || '',
      fee.amount.toString(),
      fee.date
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `fees_filtered_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
      <button onClick={() => setShowAdd(true)} className="bg-blue-500 text-white p-2 mb-4 mr-2">Add Fee Payment</button>
      {role === 'superadmin' && (
        <button onClick={downloadFeesCSV} className="bg-green-500 text-white p-2 mb-4 mr-2 inline-flex items-center">
          <Download size={16} className="mr-2" />
          Download Fees
        </button>
      )}
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

      {/* Fee Filters */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Filter Fees</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
            <input
              type="text"
              placeholder="Search by student name"
              value={filterStudentName}
              onChange={e => setFilterStudentName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              value={filterClass}
              onChange={e => setFilterClass(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">All Classes</option>
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
            <input
              type="text"
              placeholder="Search transaction ID"
              value={filterTransactionId}
              onChange={e => setFilterTransactionId(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filterAmountMin}
                onChange={e => setFilterAmountMin(e.target.value)}
                className="w-1/2 border p-2 rounded text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={filterAmountMax}
                onChange={e => setFilterAmountMax(e.target.value)}
                className="w-1/2 border p-2 rounded text-sm"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
            <input
              type="date"
              value={filterDateFrom}
              onChange={e => setFilterDateFrom(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
            <input
              type="date"
              value={filterDateTo}
              onChange={e => setFilterDateTo(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={clearFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear Filters
          </button>
          <div className="text-sm text-gray-600 flex items-center">
            Showing {getFilteredFees().length} of {fees.length} fees
          </div>
        </div>
      </div>

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
          {getFilteredFees().map(f => (
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
                    {role === 'superadmin' && <button onClick={() => { if (window.confirm('Are you sure you want to edit this fee?')) { setEditingId(f.id); setAmount(f.amount.toString()); setDate(f.date) } }} className="bg-yellow-500 text-white p-1 mr-2">Edit</button>}
                    {role === 'superadmin' && <button onClick={() => { if (window.confirm('Are you sure you want to delete this fee? This action cannot be undone.')) deleteFee(f.id) }} disabled={loading} className="bg-red-500 text-white p-1 disabled:opacity-50">{loading ? 'Deleting...' : 'Delete'}</button>}
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