import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Progress } from "./ui/progress"
import { TrendingUp, TrendingDown, Package, AlertTriangle, CheckCircle, Clock, Filter } from "lucide-react"

export function SKUDashboardSidebar() {
  const skuStats = {
    total: 245,
    active: 220,
    warning: 15,
    critical: 10,
    lastUpdate: "2시간 전"
  }

  const topPerformingSKUs = [
    {
      id: "SKU-001",
      name: "아스피린 100mg",
      accuracy: 98.5,
      trend: "up",
      volume: 1420
    },
    {
      id: "SKU-002",
      name: "메트포민 500mg", 
      accuracy: 96.8,
      trend: "stable",
      volume: 950
    },
    {
      id: "SKU-003",
      name: "로사르탄 50mg",
      accuracy: 94.2,
      trend: "down",
      volume: 520
    },
    {
      id: "SKU-004",
      name: "오메프라졸 20mg",
      accuracy: 99.1,
      trend: "up",
      volume: 780
    },
    {
      id: "SKU-005",
      name: "살부타몰 흡입제",
      accuracy: 92.3,
      trend: "down",
      volume: 380
    }
  ]

  const alertingSKUs = [
    {
      id: "SKU-123",
      name: "이부프로fen 200mg",
      issue: "재고 부족",
      severity: "critical",
      daysLeft: 2
    },
    {
      id: "SKU-124",
      name: "아목시실린 250mg",
      issue: "예측 오차",
      severity: "warning",
      daysLeft: 5
    },
    {
      id: "SKU-125",
      name: "세팔렉신 500mg",
      issue: "공급 지연",
      severity: "warning",
      daysLeft: 3
    }
  ]

  const quickFilters = [
    { label: "높은 정확도", count: 180, filter: "high-accuracy" },
    { label: "주의 필요", count: 25, filter: "needs-attention" },
    { label: "신규 SKU", count: 12, filter: "new-skus" },
    { label: "단종 예정", count: 8, filter: "discontinuing" }
  ]

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-600" />
      case "down":
        return <TrendingDown className="h-3 w-3 text-red-600" />
      default:
        return <div className="h-3 w-3 bg-gray-400 rounded-full" />
    }
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive" className="text-xs">긴급</Badge>
      case "warning":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">주의</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{severity}</Badge>
    }
  }

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 95) return "text-green-600"
    if (accuracy >= 90) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="w-80 border-r border-border p-6 space-y-6 overflow-auto">
      {/* SKU Stats Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            SKU 현황
          </CardTitle>
          <CardDescription>전체 SKU 관리 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">전체 SKU</span>
              <span className="font-semibold">{skuStats.total}개</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">정상</span>
                <span className="font-semibold text-green-600">{skuStats.active}개</span>
              </div>
              <Progress value={(skuStats.active / skuStats.total) * 100} className="h-2" />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-yellow-600">주의</span>
              <span className="font-semibold text-yellow-600">{skuStats.warning}개</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-red-600">긴급</span>
              <span className="font-semibold text-red-600">{skuStats.critical}개</span>
            </div>

            <Separator />

            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>마지막 업데이트</span>
              <span>{skuStats.lastUpdate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Filters */}
      <Card>
        <CardHeader>
          <CardTitle>빠른 필터</CardTitle>
          <CardDescription>자주 사용하는 필터들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {quickFilters.map((filter, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-between h-auto p-3"
              >
                <div className="flex items-center gap-2">
                  <Filter className="h-3 w-3" />
                  <span className="text-sm">{filter.label}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performing SKUs */}
      <Card>
        <CardHeader>
          <CardTitle>상위 성과 SKU</CardTitle>
          <CardDescription>예측 정확도 기준</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPerformingSKUs.map((sku, index) => (
              <div key={sku.id} className="flex items-center justify-between p-2 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-xs text-muted-foreground font-mono">{sku.id}</span>
                    {getTrendIcon(sku.trend)}
                  </div>
                  <h4 className="text-sm font-medium truncate">{sku.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {sku.volume.toLocaleString()}개
                  </p>
                </div>
                <div className="text-right ml-2">
                  <p className={`text-sm font-semibold ${getAccuracyColor(sku.accuracy)}`}>
                    {sku.accuracy}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerting SKUs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            주의 SKU
          </CardTitle>
          <CardDescription>즉시 조치가 필요한 SKU들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alertingSKUs.map((sku) => (
              <div key={sku.id} className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground font-mono">{sku.id}</span>
                      {getSeverityBadge(sku.severity)}
                    </div>
                    <h4 className="text-sm font-medium">{sku.name}</h4>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{sku.issue}</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{sku.daysLeft}일</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle>분석 요약</CardTitle>
          <CardDescription>전체 SKU 예측 성과</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">평균 정확도</span>
              <span className="font-semibold text-green-600">94.7%</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">예측 트렌드</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-semibold text-green-600">개선</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm">위험 SKU</span>
              <span className="font-semibold text-red-600">{skuStats.critical}개</span>
            </div>

            <Separator />

            <div className="text-center">
              <Button className="w-full" size="sm">
                상세 분석 보기
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}