import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['#ef4444', '#3b82f6', '#ec4899', '#8b5cf6', '#f59e0b', '#22c55e', '#6b7280']

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
      <div className="glass-card p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Analytics</h2>
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📊</span>
          </div>
          <p className="text-white font-medium mb-1">No data</p>
          <p className="text-sm text-gray-400">Add expenses to see charts</p>
        </div>
      </div>
    )
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card px-4 py-3 border border-white/20">
          <p className="text-sm font-semibold text-white">{payload[0].name}</p>
          <p className="text-lg font-bold text-cyan-400">${payload[0].value.toFixed(2)}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Spending Analytics</h2>
      
      <div className="mb-6">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              dataKey="value"
              strokeWidth={2}
              stroke="#0F172A"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="space-y-2">
        {categoryData
          .sort((a, b) => b.value - a.value)
          .map((item, index) => {
            const total = categoryData.reduce((sum, cat) => sum + cat.value, 0)
            const percentage = ((item.value / total) * 100).toFixed(1)
            
            return (
              <div key={item.name} className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm font-medium text-gray-300">{item.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white">${item.value.toFixed(2)}</div>
                  <div className="text-xs text-gray-400">{percentage}%</div>
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
