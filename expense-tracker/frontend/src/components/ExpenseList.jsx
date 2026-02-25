function ExpenseList({ expenses, onDeleteExpense, loading }) {
  if (loading) {
    return (
      <div className="glass-card p-8">
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-white/20 border-t-emerald-500"></div>
          <p className="ml-3 text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  const categoryConfig = {
    Food: { icon: '🍔', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
    Transport: { icon: '🚗', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    Shopping: { icon: '🛍️', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
    Entertainment: { icon: '🎬', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    Bills: { icon: '💡', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    Health: { icon: '🏥', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    Other: { icon: '📦', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Recent Expenses</h2>
        <span className="text-sm text-gray-400">{expenses.length} items</span>
      </div>
      
      {expenses.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💸</span>
          </div>
          <p className="text-white font-medium mb-1">No expenses yet</p>
          <p className="text-sm text-gray-400">Add your first expense</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
          {expenses.map((expense, index) => {
            const config = categoryConfig[expense.category] || categoryConfig.Other
            const isEven = index % 2 === 0
            
            return (
              <div 
                key={expense._id} 
                className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:bg-white/10 ${isEven ? 'bg-white/5' : 'bg-transparent'}`}
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{config.icon}</span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">{expense.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-medium px-2 py-1 rounded-lg border ${config.color}`}>
                      {expense.category}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(expense.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-lg font-bold text-cyan-400">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onDeleteExpense(expense._id)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ExpenseList
