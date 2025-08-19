import { useState } from "react"
import { TrendingUp, Package, AlertCircle, BarChart3, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { SKUSelectionFilters } from "../components/SKUSelectionFilters"
import { SKUForecastChart } from "../components/SKUForecastChart"
import { SKUActualVsForecastTable } from "../components/SKUActualVsForecastTable"
import { SKUIssuesSummary } from "../components/SKUIssuesSummary"

export function SKUForecastPage() {
  const [selectedSKU, setSelectedSKU] = useState("SKU-A001")
  const [dateRange, setDateRange] = useState("12months")

  const skuMetrics = [
    {
      label: "현재 재고",
      value: "1,247개",
      status: "normal",
      icon: Package
    },
    {
      label: "예측 정확도",
      value: "91.2%",
      status: "good",
      icon: TrendingUp
    },
    {
      label: "리드타임",
      value: "14일",
      status: "warning",
      icon: Calendar
    },
    {
      label: "이슈 등급",
      value: "중위험",
      status: "warning",
      icon: AlertCircle
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'danger': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>SKU 예측 분석</h1>
          <p className="text-muted-foreground">개별 SKU의 상세 예측 및 성과 분석</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          버전 2.0
        </Badge>
      </div>
      
      <SKUSelectionFilters 
        selectedSKU={selectedSKU}
        onSKUChange={setSelectedSKU}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* SKU Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {skuMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-lg">{metric.value}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                  <Badge className={getStatusColor(metric.status)}>
                    {metric.status === 'good' ? '양호' : 
                     metric.status === 'warning' ? '주의' : 
                     metric.status === 'danger' ? '위험' : '정상'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Analysis Tabs */}
      <Tabs defaultValue="forecast" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forecast">예측 분석</TabsTrigger>
          <TabsTrigger value="performance">성과 분석</TabsTrigger>
          <TabsTrigger value="inventory">재고 분석</TabsTrigger>
          <TabsTrigger value="issues">이슈 관리</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    SKU 예측 차트
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SKUForecastChart selectedSKU={selectedSKU} dateRange={dateRange} />
                </CardContent>
              </Card>
            </div>
            <div className="xl:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    예측 신뢰도
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">단기 예측 (1-3개월)</span>
                      <span className="text-sm">95.2%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '95.2%'}}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">중기 예측 (4-8개월)</span>
                      <span className="text-sm">87.8%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '87.8%'}}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">장기 예측 (9-12개월)</span>
                      <span className="text-sm">72.4%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '72.4%'}}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                실적 vs 예측 비교
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SKUActualVsForecastTable selectedSKU={selectedSKU} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>재고 현황</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>현재 재고</span>
                  <span>1,247개</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>안전 재고</span>
                  <span>300개</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>최대 재고</span>
                  <span>2,000개</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>발주점</span>
                  <span className="text-orange-600">500개</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>재고 회전율</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>월 평균 판매</span>
                  <span>156개</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>재고 회전 일수</span>
                  <span>8일</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>재고 회전율</span>
                  <span className="text-green-600">12.5회/년</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="issues" className="space-y-4">
          <SKUIssuesSummary selectedSKU={selectedSKU} />
        </TabsContent>
      </Tabs>
    </div>
  )
}