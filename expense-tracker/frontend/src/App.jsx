import { useState, useEffect } from 'react'
import axios from 'axios'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseChart from './components/ExpenseChart'

const API_URL = 'http://localhost:5000/api/expenses'

function App() {
  const [expenses, setExpenses] = useState([])
  const [filteredExpenses, setFilteredExpenses] = useState([])
  const [filterCategory, setFilterCategory] = useState('All')
  const [filterDate, setFilterDate] = useState('')
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=22C55E&color=fff&size=128'
  })
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      setIsLoggedIn(false)
      setExpenses([])
      setUser({ name: '', email: '', avatar: '' })
    }
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result })
      }
      reader.readAsDataURL(file)
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="glass-card p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💰</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Logged Out</h2>
          <p className="text-gray-400 mb-6">You have been successfully logged out</p>
          <button onClick={() => setIsLoggedIn(true)} className="btn-gradient w-full py-3">
            Login Again
          </button>
        </div>
      </div>
    )
  }

  const categories = ['All', 'Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Other']

  useEffect(() => {
    fetchExpenses()
  }, [])

  useEffect(() => {
    filterExpenses()
  }, [expenses, filterCategory, filterDate, searchQuery])

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
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(expense => 
        expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        expense.amount.toString().includes(searchQuery)
      )
    }
    
    // Category filter
    if (filterCategory !== 'All') {
      filtered = filtered.filter(expense => expense.category === filterCategory)
    }
    
    // Date filter
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-800/50 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Expense Pro</h1>
              <p className="text-xs text-gray-400">Finance Manager</p>
            </div>
          </div>

          <nav className="flex-1 space-y-2">
            <button onClick={() => setActiveTab('dashboard')} className={`sidebar-link w-full ${activeTab === 'dashboard' ? 'active' : ''}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>
              <span>Dashboard</span>
            </button>
            <button onClick={() => setActiveTab('expenses')} className={`sidebar-link w-full ${activeTab === 'expenses' ? 'active' : ''}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/></svg>
              <span>Expenses</span>
            </button>
            <button onClick={() => setActiveTab('reports')} className={`sidebar-link w-full ${activeTab === 'reports' ? 'active' : ''}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
              <span>Reports</span>
            </button>
            <button onClick={() => setActiveTab('settings')} className={`sidebar-link w-full ${activeTab === 'settings' ? 'active' : ''}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>
              <span>Settings</span>
            </button>
            <button onClick={() => setProfileOpen(true)} className="sidebar-link w-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
              <span>Profile</span>
            </button>
          </nav>

          <div className="pt-4 border-t border-white/10">
            <button onClick={handleLogout} className="sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/></svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="glass-card m-4 p-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/></svg>
            </button>
            
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" 
                />
                <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                  </button>
                )}
              </div>
            </div>

            <button onClick={() => setProfileOpen(true)} className="flex items-center gap-3 glass-card px-4 py-2 hover:bg-white/10 transition-colors">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 overflow-auto custom-scrollbar">
          {activeTab === 'dashboard' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-fadeIn">
                <div className="glass-card p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/></svg>
                    </div>
                    <span className="text-xs font-medium text-cyan-400 bg-cyan-500/20 px-3 py-1 rounded-full">Total</span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">${totalSpending.toFixed(2)}</p>
                  <p className="text-sm text-gray-400">Total Spending</p>
                </div>

                <div className="glass-card p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
                    </div>
                    <span className="text-xs font-medium text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full">Count</span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{filteredExpenses.length}</p>
                  <p className="text-sm text-gray-400">Transactions</p>
                </div>

                <div className="glass-card p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/></svg>
                    </div>
                    <span className="text-xs font-medium text-purple-400 bg-purple-500/20 px-3 py-1 rounded-full">Active</span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{categoryBreakdown.length}</p>
                  <p className="text-sm text-gray-400">Categories</p>
                </div>

                <div className="glass-card p-6 hover:scale-105 transition-transform">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/></svg>
                    </div>
                    <span className="text-xs font-medium text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full">Avg</span>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">${filteredExpenses.length > 0 ? (totalSpending / filteredExpenses.length).toFixed(2) : '0.00'}</p>
                  <p className="text-sm text-gray-400">Average</p>
                </div>
              </div>

              {/* Filters */}
              <div className="glass-card p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-white">Filters</h2>
                  {(filterCategory !== 'All' || filterDate) && (
                    <button onClick={() => { setFilterCategory('All'); setFilterDate('') }} className="text-sm text-emerald-400 hover:text-emerald-300 font-medium">
                      Clear filters
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500">
                    {categories.map(cat => (<option key={cat} value={cat} className="bg-slate-800">{cat}</option>))}
                  </select>
                  <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                <div className="lg:col-span-1">
                  <ExpenseForm onAddExpense={addExpense} />
                  
                  {/* Quick Insights */}
                  <div className="glass-card p-6 mt-8">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span>💡</span> Quick Insights
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-sm text-gray-400">Today's Spending</span>
                        <span className="text-sm font-bold text-emerald-400">
                          ${expenses.filter(e => new Date(e.date).toDateString() === new Date().toDateString()).reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-sm text-gray-400">This Week</span>
                        <span className="text-sm font-bold text-blue-400">
                          ${expenses.filter(e => {
                            const expenseDate = new Date(e.date)
                            const today = new Date()
                            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
                            return expenseDate >= weekAgo && expenseDate <= today
                          }).reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <span className="text-sm text-gray-400">Top Category</span>
                        <span className="text-sm font-bold text-purple-400">
                          {categoryBreakdown.length > 0 ? categoryBreakdown[0].category : 'None'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Smart Suggestions */}
                  <div className="glass-card p-6 mt-8">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span>🎯</span> Smart Advice
                    </h3>
                    <div className="space-y-3">
                      {(() => {
                        const allSuggestions = [
                          {
                            icon: '📊',
                            text: 'Track every expense, even small ones. They add up quickly!',
                            color: 'text-blue-400'
                          },
                          {
                            icon: '💰',
                            text: 'Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings.',
                            color: 'text-emerald-400'
                          },
                          {
                            icon: '📅',
                            text: 'Review your spending weekly to catch overspending early.',
                            color: 'text-purple-400'
                          }
                        ]

                        const foodSpending = categoryBreakdown.find(c => c.category === 'Food')?.total || 0
                        const transportSpending = categoryBreakdown.find(c => c.category === 'Transport')?.total || 0
                        const shoppingSpending = categoryBreakdown.find(c => c.category === 'Shopping')?.total || 0

                        if (foodSpending > totalSpending * 0.4) {
                          allSuggestions[0] = {
                            icon: '🍽️',
                            text: 'Food is 40%+ of spending. Meal prep can save 30-40% monthly.',
                            color: 'text-amber-400'
                          }
                        }

                        if (transportSpending > totalSpending * 0.3) {
                          allSuggestions[1] = {
                            icon: '🚌',
                            text: 'Transport costs are high. Try carpooling or public transit.',
                            color: 'text-blue-400'
                          }
                        }

                        if (shoppingSpending > totalSpending * 0.35) {
                          allSuggestions[2] = {
                            icon: '🛍️',
                            text: 'Shopping is 35%+ of budget. Set a strict monthly limit.',
                            color: 'text-pink-400'
                          }
                        }

                        if (totalSpending < 500 && expenses.length > 5) {
                          allSuggestions[0] = {
                            icon: '✅',
                            text: 'Excellent! You\'re managing your finances responsibly.',
                            color: 'text-emerald-400'
                          }
                        }

                        return allSuggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                            <span className="text-2xl flex-shrink-0">{suggestion.icon}</span>
                            <p className={`text-sm ${suggestion.color} leading-relaxed`}>{suggestion.text}</p>
                          </div>
                        ))
                      })()}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-8">
                  <ExpenseList expenses={filteredExpenses} onDeleteExpense={deleteExpense} loading={loading} />
                  <ExpenseChart expenses={filteredExpenses} />
                </div>
              </div>
            </>
          )}

          {activeTab === 'expenses' && (
            <div className="space-y-8">
              <ExpenseList expenses={filteredExpenses} onDeleteExpense={deleteExpense} loading={loading} />
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Monthly Spending Trend</h3>
                  <ExpenseChart expenses={filteredExpenses} />
                </div>
                
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-white mb-6">Category Distribution</h3>
                  <div className="space-y-3">
                    {categoryBreakdown.map((item, index) => {
                      const colors = ['bg-red-500', 'bg-blue-500', 'bg-pink-500', 'bg-purple-500', 'bg-amber-500', 'bg-emerald-500', 'bg-gray-500']
                      return (
                        <div key={item.category}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-300">{item.category}</span>
                            <span className="text-sm font-bold text-white">${item.total.toFixed(2)}</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                            <div 
                              className={`${colors[index % colors.length]} h-3 rounded-full transition-all duration-700`}
                              style={{ width: `${(item.total / totalSpending) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"/></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Highest Expense</p>
                      <p className="text-2xl font-bold text-white">${expenses.length > 0 ? Math.max(...expenses.map(e => e.amount)).toFixed(2) : '0.00'}</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"/></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Most Frequent</p>
                      <p className="text-2xl font-bold text-white">{categoryBreakdown.length > 0 ? categoryBreakdown.sort((a, b) => b.count - a.count)[0].category : 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">This Month</p>
                      <p className="text-2xl font-bold text-white">${totalSpending.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Recent Transactions</h3>
                <ExpenseList expenses={filteredExpenses.slice(0, 10)} onDeleteExpense={deleteExpense} loading={loading} />
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass-card p-8 text-center">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>
              <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
              <p className="text-gray-400">Application settings will be available here</p>
            </div>
          )}
        </main>
      </div>

      {/* Profile Modal */}
      {profileOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setProfileOpen(false)}>
          <div className="glass-card p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Profile</h2>
              <button onClick={() => setProfileOpen(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
            </div>
            <div className="text-center mb-6">
              <div className="relative inline-block">
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-emerald-500" />
                <label className="absolute bottom-4 right-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-emerald-600 transition-colors">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/></svg>
                  <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                </label>
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{user.name}</h3>
              <p className="text-gray-400">{user.email}</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input type="text" value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              <button onClick={() => setProfileOpen(false)} className="btn-gradient w-full">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
