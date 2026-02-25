import { useState } from 'react'

const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health', 'Other']

function ExpenseForm({ onAddExpense }) {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title || !formData.amount) return
    
    onAddExpense({
      ...formData,
      amount: parseFloat(formData.amount)
    })
    
    setFormData({
      title: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0]
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="mr-2">➕</span> Add New Expense
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter expense title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            step="0.01"
            min="0"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Add Expense
        </button>
      </form>
    </div>
  )
}

export default ExpenseForm
