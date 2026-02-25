function ExpenseList({ expenses, onDeleteExpense, loading }) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="ml-3 text-gray-500">Loading expenses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="mr-2">📋</span> Recent Expenses
        <span className="ml-auto text-sm font-normal bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
          {expenses.length} items
        </span>
      </h2>
      
      {expenses.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💸</div>
          <p className="text-gray-500 text-lg mb-2">No expenses yet</p>
          <p className="text-gray-400">Add your first expense to get started!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
          {expenses.map((expense, index) => {
            const categoryIcons = {
              'Food': '🍔',
              'Transport': '🚗',
              'Shopping': '🛍️',
              'Entertainment': '🎬',
              'Bills': '💡',
              'Health': '🏥',
              'Other': '📦'
            }
            
            return (
              <div 
                key={expense._id} 
                className="flex justify-between items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg hover:from-purple-50 hover:to-purple-100 transition-all duration-200 border border-gray-200 hover:border-purple-200 hover:shadow-md"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="text-2xl">
                    {categoryIcons[expense.category] || '📦'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">{expense.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                        {expense.category}
                      </span>
                      <span className="text-gray-500">
                        {new Date(expense.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-purple-600">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onDeleteExpense(expense._id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all duration-200 group"
                    title="Delete expense"
                  >
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
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
