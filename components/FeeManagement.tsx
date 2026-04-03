'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRole } from '@/hooks/useRole'
import Receipt from './Receipt'

type Student = { id: string; name: string; class: string }
type Fee = { id: string; student_id: string; amount: number; date: string; transaction_id: string; student?: Student }

export default function FeeManagement() {
  const [fees, setFees] = useState<Fee[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showReceipt, setShowReceipt] = useState<Fee | null>(null)
  const { role } = useRole()
  const supabase = createClient()

  useEffect(() => {
    fetchFees()
    fetchStudents()
  }, [])

  const fetchFees = async () => {
    const { data } = await supabase.from('fees').select('*, student:students(name, class)')
    setFees(data || [])
  }

  const fetchStudents = async () => {
    const { data } = await supabase.from('students').select('*')
    setStudents(data || [])
  }

  const addFee = async () => {
    const transactionId = crypto.randomUUID()
    const { data } = await supabase.from('fees').insert({
      student_id: selectedStudentId,
      amount: parseFloat(amount),
      date,
      transaction_id: transactionId
    }).select('*, student:students(name, class)').single()
    if (data) {
      setFees([...fees, data])
      setShowReceipt(data)
    }
    setShowAdd(false)
    setSelectedStudentId('')
    setAmount('')
  }

  const updateFee = async () => {
    if (editingId) {
      await supabase.from('fees').update({ amount: parseFloat(amount), date }).eq('id', editingId)
      fetchFees()
      setEditingId(null)
      setAmount('')
    }
  }

  const deleteFee = async (id: string) => {
    if (role === 'superadmin') {
      await supabase.from('fees').delete().eq('id', id)
      fetchFees()
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Fee Management</h1>
      <button onClick={() => setShowAdd(true)} className="bg-blue-500 text-white p-2 mb-4">Add Fee Payment</button>
      {showAdd && (
        <div className="mb-4">
          <select value={selectedStudentId} onChange={e => setSelectedStudentId(e.target.value)} className="border p-1 mr-2">
            <option value="">Select Student</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name} ({s.class})</option>)}
          </select>
          <input type="number" placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} className="border p-1 mr-2" />
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-1 mr-2" />
          <button onClick={addFee} className="bg-green-500 text-white p-1 mr-2">Save</button>
          <button onClick={() => setShowAdd(false)} className="bg-gray-500 text-white p-1">Cancel</button>
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
                    <button onClick={updateFee} className="bg-green-500 text-white p-1 mr-2">Save</button>
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
                    {role === 'superadmin' && <button onClick={() => deleteFee(f.id)} className="bg-red-500 text-white p-1">Delete</button>}
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