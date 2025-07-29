import { DashboardFilters } from "../components/DashboardFilters"
import { TCAForecastChart } from "../components/TCAForecastChart"
import { TCASummaryTable } from "../components/TCASummaryTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

export function DashboardPage() {
  // Sample KPI data
  const kpiData = [
    {
      title: "총 예측량",
      value: "1,234,567",
      unit: "units",
      change: "+12.5%",
      trend: "up"
    },
    {
      title: "평균 정확도", 
      value: "94.2",
      unit: "%",
      change: "+2.1%",
      trend: "up"
    },
    {
      title: "재고 회전율",
      value: "8.4",
      unit: "회",
      change: "-0.8%", 
      trend: "down"
    },
    {
      title: "재고 부족 위험",
      value: "23",
      unit: "SKU",
      change: "0%",
      trend: "stable"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">TCA Forecast Dashboard</h1>
          <p className="text-muted-foreground">24개월 예측 및 분석 대시보드</p>
        </div>
        <DashboardFilters />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {kpi.value}
                <span className="text-sm font-normal text-muted-foreground ml-1">
                  {kpi.unit}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Badge 
                  variant={kpi.trend === 'up' ? 'default' : kpi.trend === 'down' ? 'destructive' : 'secondary'}
                  className="text-xs"
                >
                  {kpi.change}
                </Badge>
                <span>from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TCAForecastChart />
        </div>
        <div className="xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>주요 지표</CardTitle>
              <CardDescription>이번 달 핵심 성과 지표</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">예측 정확도</span>
                <span className="font-semibold">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">재고 회전율</span>
                <span className="font-semibold">8.4회</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">평균 리드타임</span>
                <span className="font-semibold">12일</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">재고 부족률</span>
                <span className="font-semibold text-red-600">1.8%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary Table */}
      <TCASummaryTable />
    </div>
  )
}