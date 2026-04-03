'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRole } from '@/hooks/useRole'
import toast, { Toaster } from 'react-hot-toast'
import { ArrowLeft, Download, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

type FinancialTransaction = {
  id: string
  description: string
  amount: number
  type: 'expense' | 'collection'
  category: 'daily_expense' | 'monthly_bill' | 'adhoc_expense' | 'fee_collection'
  transaction_date: string
  created_at: string
}

const categories = [
  { value: 'daily_expense', label: 'Daily Expense' },
  { value: 'monthly_bill', label: 'Monthly Bill' },
  { value: 'adhoc_expense', label: 'Adhoc Expense' },
  { value: 'fee_collection', label: 'Fee Collection' }
]

export default function FinanceManagement() {
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const { role } = useRole()
  const supabase = createClient()

  // Form states
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState<'expense' | 'collection'>('expense')
  const [category, setCategory] = useState<string>('daily_expense')
  const [transactionDate, setTransactionDate] = useState(new Date().toISOString().split('T')[0])

  // Filter states
  const [filterType, setFilterType] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('financial_transactions')
      .select('*')
      .order('transaction_date', { ascending: false })

    if (error) {
      toast.error('Failed to fetch transactions: ' + error.message)
    } else {
      setTransactions(data || [])
    }
  }

  const getFilteredTransactions = () => {
    return transactions.filter(transaction => {
      const matchesType = !filterType || transaction.type === filterType
      const matchesCategory = !filterCategory || transaction.category === filterCategory
      const matchesDateFrom = !filterDateFrom || transaction.transaction_date >= filterDateFrom
      const matchesDateTo = !filterDateTo || transaction.transaction_date <= filterDateTo

      return matchesType && matchesCategory && matchesDateFrom && matchesDateTo
    })
  }

  const clearFilters = () => {
    setFilterType('')
    setFilterCategory('')
    setFilterDateFrom('')
    setFilterDateTo('')
  }

  const addTransaction = async () => {
    if (!description || !amount || !type || !category) {
      toast.error('Please fill all required fields')
      return
    }

    if (role !== 'admin' && role !== 'superadmin') {
      toast.error('You do not have permission to add transactions')
      return
    }

    setLoading(true)
    const { data, error } = await supabase.from('financial_transactions').insert({
      description,
      amount: parseFloat(amount),
      type,
      category,
      transaction_date: transactionDate
    }).select().single()

    if (error) {
      toast.error('Failed to add transaction: ' + error.message)
    } else {
      toast.success('Transaction added successfully!')
      setTransactions([data, ...transactions])
      resetForm()
      setShowAdd(false)
    }
    setLoading(false)
  }

  const updateTransaction = async () => {
    if (!editingId || !description || !amount || !type || !category) {
      toast.error('Please fill all required fields')
      return
    }

    if (role !== 'superadmin') {
      toast.error('Only Super Admin can edit transactions')
      return
    }

    setLoading(true)
    const { error } = await supabase
      .from('financial_transactions')
      .update({
        description,
        amount: parseFloat(amount),
        type,
        category,
        transaction_date: transactionDate
      })
      .eq('id', editingId)

    if (error) {
      toast.error('Failed to update transaction: ' + error.message)
    } else {
      toast.success('Transaction updated successfully!')
      fetchTransactions()
      resetForm()
      setEditingId(null)
    }
    setLoading(false)
  }

  const deleteTransaction = async (id: string) => {
    if (role !== 'superadmin') {
      toast.error('Only Super Admin can delete transactions')
      return
    }

    if (!window.confirm('Are you sure you want to delete this transaction? This action cannot be undone.')) {
      return
    }

    setLoading(true)
    const { error } = await supabase.from('financial_transactions').delete().eq('id', id)

    if (error) {
      toast.error('Failed to delete transaction: ' + error.message)
    } else {
      toast.success('Transaction deleted successfully!')
      setTransactions(transactions.filter(t => t.id !== id))
    }
    setLoading(false)
  }

  const resetForm = () => {
    setDescription('')
    setAmount('')
    setType('expense')
    setCategory('daily_expense')
    setTransactionDate(new Date().toISOString().split('T')[0])
  }

  const startEdit = (transaction: FinancialTransaction) => {
    setEditingId(transaction.id)
    setDescription(transaction.description)
    setAmount(transaction.amount.toString())
    setType(transaction.type)
    setCategory(transaction.category)
    setTransactionDate(transaction.transaction_date)
  }

  const downloadTransactionsCSV = () => {
    if (role !== 'superadmin') {
      toast.error('Only Super Admin can download data')
      return
    }

    const filteredTransactions = getFilteredTransactions()
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount']
    const csvData = filteredTransactions.map(transaction => [
      transaction.transaction_date,
      transaction.description,
      categories.find(c => c.value === transaction.category)?.label || transaction.category,
      transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
      transaction.amount.toString()
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `financial_transactions_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getTotalIncome = () => {
    return getFilteredTransactions()
      .filter(t => t.type === 'collection')
      .reduce((sum, t) => sum + t.amount, 0)
  }

  const getTotalExpenses = () => {
    return getFilteredTransactions()
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
  }

  const getNetAmount = () => {
    return getTotalIncome() - getTotalExpenses()
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

      <h1 className="text-2xl font-bold mb-4">Financial Management</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">₹{getTotalIncome().toFixed(2)}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg border border-red-200">
          <h3 className="text-lg font-semibold text-red-800">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">₹{getTotalExpenses().toFixed(2)}</p>
        </div>
        <div className={`p-4 rounded-lg border ${getNetAmount() >= 0 ? 'bg-blue-100 border-blue-200' : 'bg-orange-100 border-orange-200'}`}>
          <h3 className={`text-lg font-semibold ${getNetAmount() >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>Net Amount</h3>
          <p className={`text-2xl font-bold ${getNetAmount() >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            ₹{getNetAmount().toFixed(2)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-4 flex gap-2">
        {(role === 'admin' || role === 'superadmin') && (
          <button
            onClick={() => { setShowAdd(true); resetForm(); setEditingId(null) }}
            className="bg-blue-500 text-white p-2 inline-flex items-center"
          >
            <Plus size={16} className="mr-2" />
            Add Transaction
          </button>
        )}
        {role === 'superadmin' && (
          <button
            onClick={downloadTransactionsCSV}
            className="bg-green-500 text-white p-2 inline-flex items-center"
          >
            <Download size={16} className="mr-2" />
            Download Data
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6 p-4 border rounded bg-gray-50">
        <h3 className="text-lg font-semibold mb-4">Filter Transactions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">All Types</option>
              <option value="expense">Expense</option>
              <option value="collection">Collection</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
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
            Showing {getFilteredTransactions().length} of {transactions.length} transactions
          </div>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAdd && (
        <div className="mb-6 p-4 border rounded bg-gray-50">
          <h3 className="text-lg font-semibold mb-4">
            {editingId ? 'Edit Transaction' : 'Add New Transaction'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="Enter description"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full border p-2 rounded"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as 'expense' | 'collection')}
                className="w-full border p-2 rounded"
                required
              >
                <option value="expense">Expense</option>
                <option value="collection">Collection</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full border p-2 rounded"
                required
              >
                {categories.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Date *</label>
              <input
                type="date"
                value={transactionDate}
                onChange={e => setTransactionDate(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={editingId ? updateTransaction : addTransaction}
              disabled={loading}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (editingId ? 'Update' : 'Add')} Transaction
            </button>
            <button
              onClick={() => { setShowAdd(false); resetForm(); setEditingId(null) }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Date</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Amount</th>
              {(role === 'admin' || role === 'superadmin') && (
                <th className="border p-2">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {getFilteredTransactions().map(transaction => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                {editingId === transaction.id ? (
                  <>
                    <td className="border p-2">
                      <input
                        type="date"
                        value={transactionDate}
                        onChange={e => setTransactionDate(e.target.value)}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        type="text"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <select
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        className="border p-1 w-full"
                      >
                        {categories.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="border p-2">
                      <select
                        value={type}
                        onChange={e => setType(e.target.value as 'expense' | 'collection')}
                        className="border p-1 w-full"
                      >
                        <option value="expense">Expense</option>
                        <option value="collection">Collection</option>
                      </select>
                    </td>
                    <td className="border p-2">
                      <input
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                        className="border p-1 w-full"
                      />
                    </td>
                    <td className="border p-2">
                      <button
                        onClick={updateTransaction}
                        disabled={loading}
                        className="bg-green-500 text-white p-1 mr-2 disabled:opacity-50"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => { setEditingId(null); resetForm() }}
                        className="bg-gray-500 text-white p-1"
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border p-2">{new Date(transaction.transaction_date).toLocaleDateString()}</td>
                    <td className="border p-2">{transaction.description}</td>
                    <td className="border p-2">
                      {categories.find(c => c.value === transaction.category)?.label}
                    </td>
                    <td className="border p-2">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        transaction.type === 'expense'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </td>
                    <td className={`border p-2 font-semibold ${
                      transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      ₹{transaction.amount.toFixed(2)}
                    </td>
                    {(role === 'admin' || role === 'superadmin') && (
                      <td className="border p-2">
                        {role === 'superadmin' && (
                          <button
                            onClick={() => startEdit(transaction)}
                            className="bg-yellow-500 text-white p-1 mr-2 rounded"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                        )}
                        {role === 'superadmin' && (
                          <button
                            onClick={() => deleteTransaction(transaction.id)}
                            disabled={loading}
                            className="bg-red-500 text-white p-1 rounded disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {getFilteredTransactions().length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No transactions found matching your filters.
        </div>
      )}
    </div>
  )
}