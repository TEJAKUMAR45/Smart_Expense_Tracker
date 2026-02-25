import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#6366f1']

function ExpenseChart({ expenses }) {
  const categoryData = expenses.reduce((acc, expense) => {
    const existing = acc.find(item => item.name === expense.category)
    if (existing) {
      existing.value += expense.amount
    } else {
      acc.push({ name: expense.category, value: expense.amount })
    }
    return acc
  }, [])

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <span className="mr-2">📊</span> Spending by Category
        </h2>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📈</div>
          <p className="text-gray-500 text-lg mb-2">No data to display</p>
          <p className="text-gray-400">Add some expenses to see the chart</p>
        </div>
      </div>
    )
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0]
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-purple-600 font-bold">${data.value.toFixed(2)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <span className="mr-2">📊</span> Spending by Category
      </h2>
      
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              strokeWidth={2}
              stroke="#fff"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-700 mb-3">Category Details</h3>
        {categoryData
          .sort((a, b) => b.value - a.value)
          .map((item, index) => {
            const total = categoryData.reduce((sum, cat) => sum + cat.value, 0)
            const percentage = ((item.value / total) * 100).toFixed(1)
            
            return (
              <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full shadow-sm" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="font-medium text-gray-700">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800">${item.value.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">{percentage}%</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ExpenseChart
