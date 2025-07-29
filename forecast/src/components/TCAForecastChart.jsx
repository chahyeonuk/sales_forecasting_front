import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Sample data for 24-month forecast
const forecastData = [
  { month: 'Jan 2024', actual: 120000, forecast: 118000, variance: 2000 },
  { month: 'Feb 2024', actual: 135000, forecast: 132000, variance: 3000 },
  { month: 'Mar 2024', actual: 142000, forecast: 145000, variance: -3000 },
  { month: 'Apr 2024', actual: 156000, forecast: 158000, variance: -2000 },
  { month: 'May 2024', actual: 168000, forecast: 165000, variance: 3000 },
  { month: 'Jun 2024', actual: 175000, forecast: 172000, variance: 3000 },
  { month: 'Jul 2024', actual: null, forecast: 182000, variance: null },
  { month: 'Aug 2024', actual: null, forecast: 195000, variance: null },
  { month: 'Sep 2024', actual: null, forecast: 201000, variance: null },
  { month: 'Oct 2024', actual: null, forecast: 218000, variance: null },
  { month: 'Nov 2024', actual: null, forecast: 225000, variance: null },
  { month: 'Dec 2024', actual: null, forecast: 240000, variance: null },
]

export function TCAForecastChart() {
  const currentAccuracy = 94.2
  const totalVariance = forecastData
    .filter(d => d.variance !== null)
    .reduce((sum, d) => sum + Math.abs(d.variance), 0)

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <h4 className="font-semibold mb-2">{label}</h4>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm">
                {entry.dataKey === 'actual' ? '실적' : '예측'}: {entry.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>TCA 24개월 예측 차트</CardTitle>
            <CardDescription>실적 대비 예측 정확도 분석</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">정확도: {currentAccuracy}%</Badge>
            <Button variant="outline" size="sm">내보내기</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span>실적</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span>예측</span>
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={forecastData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  connectNulls={false}
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#10b981"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Chart Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">평균 예측 정확도</p>
              <p className="text-lg font-semibold text-green-600">{currentAccuracy}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">총 편차량</p>
              <p className="text-lg font-semibold">{totalVariance.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">예측 기간</p>
              <p className="text-lg font-semibold">24개월</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}