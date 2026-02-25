import { useState, useEffect } from 'react'
import axios from 'axios'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseChart from './components/ExpenseChart'
import './App.css'

const API_URL = 'http://localhost:5000/api/expenses'

function App() {
  const [expenses, setExpenses] = useState([])
  const [filteredExpenses, setFilteredExpenses] = useState([])
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterDate, setFilterDate] = useState('')
  const [loading, setLoading] = useState(true)

  const categories = ['All', 'Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Other']

  useEffect(() => {
    fetchExpenses()
  }, [])

  useEffect(() => {
    filterExpenses()
  }, [expenses, filterCategory, filterDate])

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_URL)
      setExpenses(response.data)
    } catch (error) {
      console.error('Error fetching expenses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterExpenses = () => {
    let filtered = expenses
    
    if (filterCategory !== 'All') {
      filtered = filtered.filter(expense => expense.category === filterCategory)
    }
    
    if (filterDate) {
      filtered = filtered.filter(expense => expense.date === filterDate)
    }
    
    setFilteredExpenses(filtered)
  }

  const addExpense = async (expenseData) => {
    try {
      const response = await axios.post(API_URL, expenseData)
      setExpenses([response.data, ...expenses])
    } catch (error) {
      console.error('Error adding expense:', error)
    }
  }

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setExpenses(expenses.filter(expense => expense._id !== id))
    } catch (error) {
      console.error('Error deleting expense:', error)
    }
  }

  const totalSpending = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  const categoryBreakdown = categories.slice(1).map(category => {
    const categoryExpenses = filteredExpenses.filter(expense => expense.category === category)
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    return { category, total, count: categoryExpenses.length }
  }).filter(item => item.total > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Smart Expense Tracker
          </h1>
          <p className="text-blue-100 text-lg">Track your expenses with ease and insights</p>
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Form */}
          <div className="xl:col-span-1">
            <ExpenseForm onAddExpense={addExpense} />
          </div>
          
          {/* Right Column - Filters and Summary */}
          <div className="xl:col-span-2 space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">🔍</span> Filters
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              {(filterCategory !== 'All' || filterDate) && (
                <button
                  onClick={() => { setFilterCategory('All'); setFilterDate('') }}
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Spending</h3>
                <p className="text-2xl font-bold text-purple-600">${totalSpending.toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Total Expenses</h3>
                <p className="text-2xl font-bold text-blue-600">{filteredExpenses.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl mb-2">🏷️</div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Categories</h3>
                <p className="text-2xl font-bold text-pink-600">{categoryBreakdown.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl mb-2">📈</div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">Avg. Expense</h3>
                <p className="text-2xl font-bold text-green-600">
                  ${filteredExpenses.length > 0 ? (totalSpending / filteredExpenses.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Lists Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ExpenseList 
            expenses={filteredExpenses} 
            onDeleteExpense={deleteExpense} 
            loading={loading} 
          />
          <ExpenseChart expenses={filteredExpenses} />
        </div>

        {/* Category Breakdown */}
        {categoryBreakdown.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="mr-2">📋</span> Category Breakdown
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categoryBreakdown.map((item, index) => {
                const icons = ['🍔', '🚗', '🛍️', '🎬', '💡', '🏥', '📦']
                return (
                  <div key={item.category} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{icons[index % icons.length]}</span>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {item.count} items
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">{item.category}</h3>
                    <p className="text-xl font-bold text-purple-600">${item.total.toFixed(2)}</p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(item.total / totalSpending) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">
                      {((item.total / totalSpending) * 100).toFixed(1)}% of total
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App