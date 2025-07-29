import { TCADashboardSidebar } from "../components/TCADashboardSidebar"
import { TCAForecastChart } from "../components/TCAForecastChart"  
import { TCASummaryTable } from "../components/TCASummaryTable"
import { DashboardFilters } from "../components/DashboardFilters"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"

export function TCAForecastPage() {
  const forecastAccuracy = [
    { period: "1개월", accuracy: 96.5 },
    { period: "3개월", accuracy: 92.1 },
    { period: "6개월", accuracy: 88.7 },
    { period: "12개월", accuracy: 84.3 },
    { period: "24개월", accuracy: 79.2 }
  ]

  const tcaList = [
    { 
      code: "TCA-001", 
      name: "제품군 A", 
      currentStock: 45200, 
      forecast3M: 52000,
      forecast6M: 98500,
      forecast12M: 185300,
      status: "정상",
      accuracy: 94.5
    },
    { 
      code: "TCA-002", 
      name: "제품군 B", 
      currentStock: 23150, 
      forecast3M: 28400,
      forecast6M: 54200,
      forecast12M: 102800,
      status: "주의",
      accuracy: 87.2
    },
    { 
      code: "TCA-003", 
      name: "제품군 C", 
      currentStock: 12800, 
      forecast3M: 15200,
      forecast6M: 29600,
      forecast12M: 56100,
      status: "위험",
      accuracy: 76.8
    }
  ]

  return (
    <div className="flex h-full">
      <TCADashboardSidebar />
      <div className="flex-1 p-6 space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">TCA 예측 분석</h1>
            <p className="text-muted-foreground">Therapeutic Category Analysis - 24개월 예측</p>
          </div>
          <DashboardFilters />
        </div>

        {/* Forecast Accuracy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {forecastAccuracy.map((item, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardDescription className="text-center">{item.period} 예측</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="text-2xl font-bold">
                  {item.accuracy}%
                </div>
                <Badge 
                  variant={item.accuracy > 90 ? "default" : item.accuracy > 80 ? "secondary" : "destructive"}
                  className="mt-2"
                >
                  {item.accuracy > 90 ? "우수" : item.accuracy > 80 ? "양호" : "개선필요"}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="chart" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chart">예측 차트</TabsTrigger>
            <TabsTrigger value="analysis">분석 결과</TabsTrigger>
            <TabsTrigger value="comparison">기간별 비교</TabsTrigger>
          </TabsList>

          <TabsContent value="chart" className="space-y-4">
            <TCAForecastChart />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>TCA별 성과 분석</CardTitle>
                  <CardDescription>각 치료군별 예측 정확도 및 현황</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tcaList.map((tca, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{tca.code}</h4>
                          <p className="text-sm text-muted-foreground">{tca.name}</p>
                          <p className="text-xs text-muted-foreground">
                            정확도: {tca.accuracy}%
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={
                              tca.status === "정상" ? "default" : 
                              tca.status === "주의" ? "secondary" : "destructive"
                            }
                          >
                            {tca.status}
                          </Badge>
                          <p className="text-sm font-semibold mt-1">
                            {tca.currentStock.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>예측 트렌드 요약</CardTitle>
                  <CardDescription>향후 12개월 예측 트렌드</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-sm">상승 트렌드</span>
                      <span className="font-semibold text-green-600">5개 TCA</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                      <span className="text-sm">안정 트렌드</span>
                      <span className="font-semibold text-yellow-600">3개 TCA</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                      <span className="text-sm">하락 트렌드</span>
                      <span className="font-semibold text-red-600">2개 TCA</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <TCASummaryTable />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}