import { useState } from "react"
import { BarChart3, TrendingUp, Package, AlertTriangle, Target, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { TCAForecastChart } from "../components/TCAForecastChart"
import { TCASummaryTable } from "../components/TCASummaryTable"
import { DashboardFilters } from "../components/DashboardFilters"

export function DashboardPage() {
  const [selectedTCA, setSelectedTCA] = useState("TCA-001")
  const [dateRange, setDateRange] = useState("24months")

  const kpiData = [
    {
      title: "총 TCA 매출",
      value: "₩15.2억",
      change: "+12.5%",
      icon: DollarSign,
      changeType: "positive"
    },
    {
      title: "예측 정확도",
      value: "87.3%",
      change: "+2.1%",
      icon: Target,
      changeType: "positive"
    },
    {
      title: "활성 SKU",
      value: "1,247개",
      change: "-5개",
      icon: Package,
      changeType: "negative"
    },
    {
      title: "이슈 발생률",
      value: "3.2%",
      change: "-0.8%",
      icon: AlertTriangle,
      changeType: "positive"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>TCA 예측 대시보드</h1>
          <p className="text-muted-foreground">전체 TCA 매출 및 예측 현황을 확인하세요</p>
        </div>
      </div>
      
      <DashboardFilters 
        selectedTCA={selectedTCA}
        onTCAChange={setSelectedTCA}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="text-2xl">{kpi.value}</div>
                <p className={`text-xs ${
                  kpi.changeType === 'positive' 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {kpi.change} 전월 대비
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                TCA 예측 차트
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TCAForecastChart selectedTCA={selectedTCA} dateRange={dateRange} />
            </CardContent>
          </Card>
        </div>
        <div className="xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                TCA 요약
              </CardTitle>
            </CardHeader>
            <CardContent>
              <TCASummaryTable selectedTCA={selectedTCA} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}