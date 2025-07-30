import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data for 24 months TCA forecast
const forecastData = [
  { month: '2024-01', tca: 85000, actual: 82000 },
  { month: '2024-02', tca: 88000, actual: 85500 },
  { month: '2024-03', tca: 92000, actual: 89000 },
  { month: '2024-04', tca: 95000, actual: 93000 },
  { month: '2024-05', tca: 98000, actual: 96500 },
  { month: '2024-06', tca: 102000, actual: 99000 },
  { month: '2024-07', tca: 105000, actual: null },
  { month: '2024-08', tca: 108000, actual: null },
  { month: '2024-09', tca: 112000, actual: null },
  { month: '2024-10', tca: 115000, actual: null },
  { month: '2024-11', tca: 118000, actual: null },
  { month: '2024-12', tca: 122000, actual: null },
  { month: '2025-01', tca: 125000, actual: null },
  { month: '2025-02', tca: 128000, actual: null },
  { month: '2025-03', tca: 132000, actual: null },
  { month: '2025-04', tca: 135000, actual: null },
  { month: '2025-05', tca: 138000, actual: null },
  { month: '2025-06', tca: 142000, actual: null },
  { month: '2025-07', tca: 145000, actual: null },
  { month: '2025-08', tca: 148000, actual: null },
  { month: '2025-09', tca: 152000, actual: null },
  { month: '2025-10', tca: 155000, actual: null },
  { month: '2025-11', tca: 158000, actual: null },
  { month: '2025-12', tca: 162000, actual: null }
]


export function TCAForecastChart({ selectedTCA, dateRange }) {
  return (
    <div className="w-full h-96">
      <h3 className="mb-4">TCA Forecast Chart 24M</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={forecastData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip 
            formatter={(value, name) => [
              new Intl.NumberFormat('ko-KR').format(value), 
              name === 'tca' ? 'TCA 예측' : '실적'
            ]}
            labelFormatter={(label) => `기간: ${label}`}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="tca" 
            stroke="#2563eb" 
            strokeWidth={2}
            name="TCA 예측"
            strokeDasharray="5 5"
          />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#16a34a" 
            strokeWidth={2}
            name="실적"
            connectNulls={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}