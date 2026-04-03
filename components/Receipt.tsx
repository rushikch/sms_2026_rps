'use client'

import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

type Student = { id: string; name: string; class: string; parent_name: string; student_id: string }
type Fee = { id: string; student_id: string; amount: number; date: string; transaction_id: string }

interface ReceiptProps {
  fee: Fee
  student: Student
  onClose: () => void
}

export default function Receipt({ fee, student, onClose }: ReceiptProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: `Receipt-${fee.transaction_id}`,
  })

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-md w-full">
        <button onClick={onClose} className="float-right text-gray-500 text-xl font-bold">×</button>
        <div ref={ref} className="receipt p-4 border">
          <h1 className="text-center text-xl font-bold">Rainbow Public School</h1>
          <h2 className="text-center text-lg">Fee Receipt</h2>
          <div className="mt-4">
            <p><strong>Student Name:</strong> {student.name}</p>
            <p><strong>Parent Name:</strong> {student.parent_name}</p>
            <p><strong>Class:</strong> {student.class}</p>
            <p><strong>Student ID:</strong> {student.student_id}</p>
            <p><strong>Fee Amount:</strong> ₹{fee.amount}</p>
            <p><strong>Date:</strong> {fee.date}</p>
            <p><strong>Transaction ID:</strong> {fee.transaction_id}</p>
          </div>
        </div>
        <button onClick={() => handlePrint()} className="mt-4 bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600">Print</button>
      </div>
    </div>
  )
}