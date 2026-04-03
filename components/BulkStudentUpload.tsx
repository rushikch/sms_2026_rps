'use client'

import { useState, useRef } from 'react'
import toast from 'react-hot-toast'
import { Upload, Download, X } from 'lucide-react'

interface UploadResponse {
  success: boolean
  message: string
  data?: {
    created_students: number
    created_fees: number
    student_ids: string[]
    errors: Array<{ row: number; error: string }>
  }
  error?: string
}

export default function BulkStudentUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<UploadResponse | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const downloadTemplate = () => {
    const headers = [
      'name',
      'class',
      'parent_name',
      'phone',
      'address',
      'date_of_birth',
      'date_of_joining',
      'aadhar_number',
      'initial_fee_amount',
      'fees_date',
      'other_details'
    ]

    const templateData = [
      {
        name: 'John Doe',
        class: 'Class 1',
        parent_name: 'Jane Doe',
        phone: '9876543210',
        address: '123 Main Street',
        date_of_birth: '2018-05-15',
        date_of_joining: '2024-04-01',
        aadhar_number: '123456789012',
        initial_fee_amount: '5000',
        fees_date: '2024-04-01',
        other_details: 'None'
      }
    ]

    let csv = headers.join(',') + '\n'
    templateData.forEach(row => {
      csv += headers.map(header => {
        const value = row[header as keyof typeof row] || ''
        return `"${value}"`
      }).join(',') + '\n'
    })

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'student_bulk_upload_template.csv'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.currentTarget.files?.[0]
    if (selectedFile) {
      // Validate file type
      if (!['text/csv', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(selectedFile.type) && 
          !selectedFile.name.endsWith('.csv')) {
        toast.error('Please upload a CSV or Excel file')
        return
      }

      setFile(selectedFile)
      setResult(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      toast.error('Please select a file')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/students/bulk-upload', {
        method: 'POST',
        body: formData
      })

      const data: UploadResponse = await response.json()
      setResult(data)

      if (data.success) {
        toast.success(data.message)
        setFile(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
      } else {
        toast.error(data.error || data.message)
      }
    } catch (error) {
      toast.error('Failed to upload file')
      console.error('Upload error:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Bulk Student Upload</h2>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 mb-2">Instructions:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Download the template CSV file</li>
          <li>• Fill in student details (Student ID will be auto-generated)</li>
          <li>• Upload the CSV file to create multiple students</li>
          <li>• Optionally include initial fees with amount and date</li>
        </ul>
      </div>

      {/* Download Template */}
      <button
        onClick={downloadTemplate}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition mb-6"
      >
        <Download size={18} />
        Download Template CSV
      </button>

      {/* File Upload */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select CSV File
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileSelect}
            className="hidden"
          />
          {file ? (
            <div className="flex items-center justify-center gap-4">
              <div className="flex-1">
                <p className="text-gray-700 font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <button
                onClick={() => {
                  setFile(null)
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }}
                className="text-red-500 hover:text-red-700"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-2 text-center"
            >
              <Upload size={32} className="text-gray-400" />
              <span className="text-gray-600">
                Click to select a CSV file or drag and drop
              </span>
              <span className="text-xs text-gray-500">CSV file only</span>
            </button>
          )}
        </div>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition font-medium"
      >
        {uploading ? 'Uploading...' : 'Upload and Create Students'}
      </button>

      {/* Results */}
      {result && (
        <div className={`mt-6 p-4 rounded-lg border ${
          result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <h3 className={`font-semibold mb-2 ${
            result.success ? 'text-green-900' : 'text-red-900'
          }`}>
            {result.message}
          </h3>

          {result.data && (
            <div className="text-sm space-y-2 mb-4">
              <p className="text-gray-700">
                <strong>Students Created:</strong> {result.data.created_students}
              </p>
              <p className="text-gray-700">
                <strong>Fees Created:</strong> {result.data.created_fees}
              </p>

              {result.data.student_ids.length > 0 && (
                <div>
                  <p className="font-medium text-gray-700 mb-1">
                    Student IDs:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {result.data.student_ids.map((id, idx) => (
                      <code key={idx} className="text-xs bg-gray-100 p-1 rounded">
                        {id}
                      </code>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {result.data?.errors && result.data.errors.length > 0 && (
            <div className="text-sm">
              <p className="font-medium text-yellow-900 mb-2">
                Errors ({result.data.errors.length}):
              </p>
              <div className="max-h-40 overflow-y-auto bg-white border border-yellow-200 rounded p-2">
                {result.data.errors.map((err, idx) => (
                  <p key={idx} className="text-yellow-800 text-xs mb-1">
                    <strong>Row {err.row}:</strong> {err.error}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
