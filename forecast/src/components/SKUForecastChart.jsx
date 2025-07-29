import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts'
import { Download, Settings, TrendingUp, AlertTriangle } from "lucide-react"

// Sample data for SKU forecast with dual-axis
const skuForecastData = [
  { 
    month: 'Jan 2024', 
    actual: 1200, 
    forecast: 1180, 
    variance: 20,
    accuracy: 98.3,
    demand: 1250,
    supply: 1300
  },
  { 
    month: 'Feb 2024', 
    actual: 1350, 
    forecast: 1320, 
    variance: 30,
    accuracy: 97.8,
    demand: 1380,
    supply: 1400
  },
  { 
    month: 'Mar 2024', 
    actual: 1420, 
    forecast: 1450, 
    variance: -30,
    accuracy: 97.9,
    demand: 1480,
    supply: 1500
  },
  { 
    month: 'Apr 2024', 
    actual: 1560, 
    forecast: 1580, 
    variance: -20,
    accuracy: 98.7,
    demand: 1600,
    supply: 1650
  },
  { 
    month: 'May 2024', 
    actual: 1680, 
    forecast: 1650, 
    variance: 30,
    accuracy: 98.2,
    demand: 1720,
    supply: 1750
  },
  { 
    month: 'Jun 2024', 
    actual: 1750, 
    forecast: 1720, 
    variance: 30,
    accuracy: 98.3,
    demand: 1800,
    supply: 1820
  },
  { 
    month: 'Jul 2024', 
    actual: null, 
    forecast: 1820, 
    variance: null,
    accuracy: null,
    demand: 1850,
    supply: 1900
  },
  { 
    month: 'Aug 2024', 
    actual: null, 
    forecast: 1950, 
    variance: null,
    accuracy: null,
    demand: 1980,
    supply: 2000
  },
  { 
    month: 'Sep 2024', 
    actual: null, 
    forecast: 2010, 
    variance: null,
    accuracy: null,
    demand: 2050,
    supply: 2100
  },
  { 
    month: 'Oct 2024', 
    actual: null, 
    forecast: 2180, 
    variance: null,
    accuracy: null,
    demand: 2200,
    supply: 2250
  },
  { 
    month: 'Nov 2024', 
    actual: null, 
    forecast: 2250, 
    variance: null,
    accuracy: null,
    demand: 2300,
    supply: 2350
  },
  { 
    month: 'Dec 2024', 
    actual: null, 
    forecast: 2400, 
    variance: null,
    accuracy: null,
    demand: 2450,
    supply: 2500
  },
]

export function SKUForecastChart() {
  const selectedSKU = "SKU-12345"
  const currentAccuracy = 98.1
  const trend = "상승"

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <h4 className="font-semibold mb-2">{label}</h4>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span>
                {entry.dataKey === 'actual' ? '실적' : 
                 entry.dataKey === 'forecast' ? '예측' :
                 entry.dataKey === 'demand' ? '수요' : '공급'}: {entry.value?.toLocaleString()}
              </span>
            </div>
          ))}
          {payload[0]?.payload?.accuracy && (
            <div className="mt-2 pt-2 border-t text-xs text-muted-foreground">
              정확도: {payload[0].payload.accuracy}%
            </div>
          )}
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
            <CardTitle className="flex items-center gap-2">
              SKU 예측 차트 (Enhanced)
              {trend === "상승" ? (
                <TrendingUp className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              )}
            </CardTitle>
            <CardDescription>
              {selectedSKU} - 실적 vs 예측 및 수요/공급 분석
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="SKU-12345">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SKU-12345">SKU-12345</SelectItem>
                <SelectItem value="SKU-12346">SKU-12346</SelectItem>
                <SelectItem value="SKU-12347">SKU-12347</SelectItem>
              </SelectContent>
            </Select>
            <Badge variant="outline">정확도: {currentAccuracy}%</Badge>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              설정
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              내보내기
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="forecast" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="forecast">예측 분석</TabsTrigger>
            <TabsTrigger value="supply-demand">수요/공급</TabsTrigger>
            <TabsTrigger value="accuracy">정확도 트렌드</TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="space-y-4">
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

            {/* Main Chart */}
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={skuForecastData}
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
                    tickFormatter={(value) => value.toLocaleString()}
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
          </TabsContent>

          <TabsContent value="supply-demand" className="space-y-4">
            {/* Supply/Demand Chart */}
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={skuForecastData}
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
                    tickFormatter={(value) => value.toLocaleString()}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="demand" fill="#f59e0b" name="수요" />
                  <Line
                    type="monotone"
                    dataKey="supply"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                    name="공급"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="accuracy" className="space-y-4">
            {/* Accuracy Trend Chart */}
            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={skuForecastData.filter(d => d.accuracy)}
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
                    domain={['dataMin - 1', 'dataMax + 1']}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, '정확도']}
                    labelFormatter={(label) => `기간: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="accuracy"
                    stroke="#ef4444"
                    strokeWidth={3}
                    dot={{ fill: '#ef4444', strokeWidth: 2, r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        {/* Chart Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">평균 정확도</p>
            <p className="text-lg font-semibold text-green-600">{currentAccuracy}%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">예측 트렌드</p>
            <p className="text-lg font-semibold">{trend}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">분석 기간</p>
            <p className="text-lg font-semibold">12개월</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">마지막 업데이트</p>
            <p className="text-lg font-semibold">1시간 전</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}