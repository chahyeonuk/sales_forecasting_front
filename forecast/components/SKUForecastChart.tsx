import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Mock data for SKU forecast with both quantity and KRW
const skuForecastData = [
  { month: '2024-07', qty_actual: 150, qty_forecast: 145, krw_actual: 1500000, krw_forecast: 1450000 },
  { month: '2024-08', qty_actual: 180, qty_forecast: 175, krw_actual: 1800000, krw_forecast: 1750000 },
  { month: '2024-09', qty_actual: 160, qty_forecast: 165, krw_actual: 1600000, krw_forecast: 1650000 },
  { month: '2024-10', qty_actual: 200, qty_forecast: 190, krw_actual: 2000000, krw_forecast: 1900000 },
  { month: '2024-11', qty_actual: 220, qty_forecast: 215, krw_actual: 2200000, krw_forecast: 2150000 },
  { month: '2024-12', qty_actual: 250, qty_forecast: 240, krw_actual: 2500000, krw_forecast: 2400000 },
  { month: '2025-01', qty_actual: null, qty_forecast: 260, krw_actual: null, krw_forecast: 2600000 },
  { month: '2025-02', qty_actual: null, qty_forecast: 270, krw_actual: null, krw_forecast: 2700000 },
  { month: '2025-03', qty_actual: null, qty_forecast: 285, krw_actual: null, krw_forecast: 2850000 },
  { month: '2025-04', qty_actual: null, qty_forecast: 300, krw_actual: null, krw_forecast: 3000000 },
  { month: '2025-05', qty_actual: null, qty_forecast: 310, krw_actual: null, krw_forecast: 3100000 },
  { month: '2025-06', qty_actual: null, qty_forecast: 320, krw_actual: null, krw_forecast: 3200000 }
]

export function SKUForecastChart() {
  return (
    <div className="w-full h-96">
      <h3 className="mb-4">SKU Forecast: Qty, KRW</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={skuForecastData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            yAxisId="qty"
            orientation="left" 
            tick={{ fontSize: 12 }}
            label={{ value: '수량', angle: -90, position: 'insideLeft' }}
          />
          <YAxis 
            yAxisId="krw"
            orientation="right" 
            tick={{ fontSize: 12 }}
            label={{ value: '금액 (원)', angle: 90, position: 'insideRight' }}
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name.includes('qty')) {
                return [value + '개', name.includes('actual') ? '실제 수량' : '예측 수량']
              } else {
                return [new Intl.NumberFormat('ko-KR').format(value as number) + '원', name.includes('actual') ? '실제 매출' : '예측 매출']
              }
            }}
            labelFormatter={(label) => `기간: ${label}`}
          />
          <Legend />
          
          {/* Quantity bars */}
          <Bar 
            yAxisId="qty"
            dataKey="qty_actual" 
            fill="#3b82f6" 
            name="실제 수량"
            opacity={0.7}
          />
          <Bar 
            yAxisId="qty"
            dataKey="qty_forecast" 
            fill="#93c5fd" 
            name="예측 수량"
            opacity={0.7}
          />
          
          {/* KRW lines */}
          <Line 
            yAxisId="krw"
            type="monotone" 
            dataKey="krw_actual" 
            stroke="#16a34a" 
            strokeWidth={2}
            name="실제 매출"
            connectNulls={false}
          />
          <Line 
            yAxisId="krw"
            type="monotone" 
            dataKey="krw_forecast" 
            stroke="#4ade80" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="예측 매출"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}