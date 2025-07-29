import { SKUDashboardSidebar } from "../components/SKUDashboardSidebar"
import { SKUForecastChart } from "../components/SKUForecastChart"
import { SKUActualVsForecastTable } from "../components/SKUActualVsForecastTable"
import { SKUSelectionFilters } from "../components/SKUSelectionFilters"
import { SKUIssuesSummary } from "../components/SKUIssuesSummary"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"

export function SKUForecastPage() {
  const accuracyRanges = [
    { range: "90% 이상", count: 156, percentage: 65, color: "bg-green-500" },
    { range: "80-90%", count: 89, percentage: 25, color: "bg-blue-500" },
    { range: "70-80%", count: 23, percentage: 8, color: "bg-yellow-500" },
    { range: "70% 미만", count: 7, percentage: 2, color: "bg-red-500" }
  ]

  const topPerformingSKUs = [
    { code: "SKU-12345", name: "제품 A", accuracy: 96.8, trend: "상승" },
    { code: "SKU-12346", name: "제품 B", accuracy: 95.2, trend: "안정" },
    { code: "SKU-12347", name: "제품 C", accuracy: 94.7, trend: "상승" },
    { code: "SKU-12348", name: "제품 D", accuracy: 93.9, trend: "하락" },
    { code: "SKU-12349", name: "제품 E", accuracy: 93.1, trend: "안정" }
  ]

  return (
    <div className="flex h-full">
      <SKUDashboardSidebar />
      <div className="flex-1 p-6 space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">SKU 예측 분석 (Enhanced)</h1>
            <p className="text-muted-foreground">Stock Keeping Unit - 실적 vs 예측 비교 분석</p>
          </div>
          <SKUSelectionFilters />
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">전체 SKU 수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">275</div>
              <p className="text-xs text-muted-foreground">활성 SKU 기준</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">평균 예측 정확도</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91.4%</div>
              <Badge variant="default" className="mt-1">+2.3%</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">고위험 SKU</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">7</div>
              <p className="text-xs text-muted-foreground">정확도 70% 미만</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">예측 범위</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12개월</div>
              <p className="text-xs text-muted-foreground">최대 예측 기간</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="forecast" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="forecast">예측 차트</TabsTrigger>
            <TabsTrigger value="accuracy">정확도 분석</TabsTrigger>
            <TabsTrigger value="comparison">실적 비교</TabsTrigger>
            <TabsTrigger value="issues">이슈 관리</TabsTrigger>
          </TabsList>

          <TabsContent value="forecast" className="space-y-4">
            <SKUForecastChart />
          </TabsContent>

          <TabsContent value="accuracy" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>정확도 분포</CardTitle>
                  <CardDescription>SKU별 예측 정확도 범위</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {accuracyRanges.map((range, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{range.range}</span>
                        <span>{range.count}개 SKU ({range.percentage}%)</span>
                      </div>
                      <Progress value={range.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>상위 성과 SKU</CardTitle>
                  <CardDescription>예측 정확도 Top 5</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topPerformingSKUs.map((sku, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="font-semibold text-sm">{sku.code}</p>
                          <p className="text-xs text-muted-foreground">{sku.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-sm">{sku.accuracy}%</p>
                          <Badge 
                            variant={
                              sku.trend === "상승" ? "default" : 
                              sku.trend === "안정" ? "secondary" : "destructive"
                            }
                            className="text-xs"
                          >
                            {sku.trend}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <SKUActualVsForecastTable />
          </TabsContent>

          <TabsContent value="issues" className="space-y-4">
            <SKUIssuesSummary />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}