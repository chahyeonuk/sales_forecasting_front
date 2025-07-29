import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Calendar, Filter, Download, Settings } from "lucide-react"

export function TCADashboardSidebar() {
  const tcaCategories = [
    { code: "TCA-001", name: "심혈관계", count: 45, status: "active" },
    { code: "TCA-002", name: "소화기계", count: 32, status: "active" },
    { code: "TCA-003", name: "호흡기계", count: 28, status: "warning" },
    { code: "TCA-004", name: "신경계", count: 67, status: "active" },
    { code: "TCA-005", name: "내분비계", count: 23, status: "active" },
    { code: "TCA-006", name: "근골격계", count: 19, status: "warning" },
    { code: "TCA-007", name: "비뇨기계", count: 34, status: "active" },
    { code: "TCA-008", name: "안과", count: 12, status: "active" }
  ]

  const quickActions = [
    { icon: Calendar, label: "기간 설정", description: "예측 기간 조정" },
    { icon: Filter, label: "필터 적용", description: "TCA별 필터링" },
    { icon: Download, label: "데이터 내보내기", description: "Excel/CSV 다운로드" },
    { icon: Settings, label: "설정", description: "예측 모델 설정" }
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">정상</Badge>
      case "warning":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">주의</Badge>
      case "error":
        return <Badge variant="destructive" className="bg-red-100 text-red-800">위험</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="w-80 border-r border-border p-6 space-y-6 overflow-auto">
      {/* TCA Categories */}
      <Card>
        <CardHeader>
          <CardTitle>치료군 목록</CardTitle>
          <CardDescription>등록된 TCA 카테고리</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tcaCategories.map((tca) => (
              <div key={tca.code} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{tca.code}</h4>
                  <p className="text-xs text-muted-foreground">{tca.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {tca.count}개 SKU
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {getStatusBadge(tca.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 작업</CardTitle>
          <CardDescription>자주 사용하는 기능들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start h-auto p-3"
              >
                <action.icon className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-sm">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Forecast Summary */}
      <Card>
        <CardHeader>
          <CardTitle>예측 요약</CardTitle>
          <CardDescription>전체 TCA 예측 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">평균 정확도</span>
              <span className="font-semibold text-green-600">91.2%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">총 SKU 수</span>
              <span className="font-semibold">260개</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">주의 대상</span>
              <span className="font-semibold text-yellow-600">2개</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">마지막 업데이트</span>
              <span className="text-xs text-muted-foreground">2시간 전</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}