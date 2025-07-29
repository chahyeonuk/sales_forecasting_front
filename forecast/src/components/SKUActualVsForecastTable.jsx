import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Progress } from "./ui/progress"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Download, Filter } from "lucide-react"

const mockComparisonData = [
  {
    sku: "SKU-001",
    name: "아스피린 100mg",
    period: "2024-01",
    actual: 1420,
    forecast: 1350,
    variance: 70,
    variancePercent: 5.2,
    accuracy: 94.8,
    trend: "up",
    status: "good"
  },
  {
    sku: "SKU-002", 
    name: "메트포민 500mg",
    period: "2024-01",
    actual: 950,
    forecast: 980,
    variance: -30,
    variancePercent: -3.1,
    accuracy: 96.9,
    trend: "stable",
    status: "good"
  },
  {
    sku: "SKU-003",
    name: "로사르탄 50mg",
    period: "2024-01", 
    actual: 520,
    forecast: 620,
    variance: -100,
    variancePercent: -16.1,
    accuracy: 83.9,
    trend: "down",
    status: "warning"
  },
  {
    sku: "SKU-004",
    name: "오메프라졸 20mg",
    period: "2024-01",
    actual: 780,
    forecast: 750,
    variance: 30,
    variancePercent: 4.0,
    accuracy: 96.0,
    trend: "up", 
    status: "good"
  },
  {
    sku: "SKU-005",
    name: "살부타몰 흡입제",
    period: "2024-01",
    actual: 380,
    forecast: 450,
    variance: -70,
    variancePercent: -15.6,
    accuracy: 84.4,
    trend: "down",
    status: "warning"
  },
  {
    sku: "SKU-006",
    name: "이부프로펜 200mg",
    period: "2024-01",
    actual: 1200,
    forecast: 1100,
    variance: 100,
    variancePercent: 9.1,
    accuracy: 90.9,
    trend: "up",
    status: "good"
  },
  {
    sku: "SKU-007",
    name: "아목시실린 250mg",
    period: "2024-01",
    actual: 650,
    forecast: 800,
    variance: -150,
    variancePercent: -18.8,
    accuracy: 81.2,
    trend: "down",
    status: "critical"
  }
]

export function SKUActualVsForecastTable() {
  const [selectedPeriod, setSelectedPeriod] = useState("2024-01")
  const [sortBy, setSortBy] = useState("variance")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredData = mockComparisonData.filter(item => {
    if (filterStatus === "all") return true
    return item.status === filterStatus
  })

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case "variance":
        return Math.abs(b.variancePercent) - Math.abs(a.variancePercent)
      case "accuracy":
        return b.accuracy - a.accuracy
      case "actual":
        return b.actual - a.actual
      default:
        return 0
    }
  })

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "good":
        return <Badge variant="default" className="bg-green-100 text-green-800">양호</Badge>
      case "warning":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">주의</Badge>
      case "critical":
        return <Badge variant="destructive">위험</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getVarianceColor = (variance) => {
    const absVariance = Math.abs(variance)
    if (absVariance <= 5) return "text-green-600"
    if (absVariance <= 15) return "text-yellow-600"
    return "text-red-600"
  }

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 95) return "text-green-600"
    if (accuracy >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  const summaryStats = {
    totalSKUs: sortedData.length,
    avgAccuracy: (sortedData.reduce((sum, item) => sum + item.accuracy, 0) / sortedData.length).toFixed(1),
    goodCount: sortedData.filter(item => item.status === "good").length,
    warningCount: sortedData.filter(item => item.status === "warning").length,
    criticalCount: sortedData.filter(item => item.status === "critical").length
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">총 SKU</p>
                <p className="text-2xl font-semibold">{summaryStats.totalSKUs}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">평균 정확도</p>
                <p className="text-2xl font-semibold text-green-600">{summaryStats.avgAccuracy}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">주의 필요</p>
                <p className="text-2xl font-semibold text-yellow-600">{summaryStats.warningCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">위험</p>
                <p className="text-2xl font-semibold text-red-600">{summaryStats.criticalCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>실제 vs 예측 비교 분석</CardTitle>
              <CardDescription>SKU별 예측 정확도 및 편차 분석</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              내보내기
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="기간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-01">2024년 1월</SelectItem>
                <SelectItem value="2023-12">2023년 12월</SelectItem>
                <SelectItem value="2023-11">2023년 11월</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="variance">편차순</SelectItem>
                <SelectItem value="accuracy">정확도순</SelectItem>
                <SelectItem value="actual">실제량순</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="good">양호</SelectItem>
                <SelectItem value="warning">주의</SelectItem>
                <SelectItem value="critical">위험</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              필터 적용
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>상세 비교 결과</CardTitle>
          <CardDescription>{selectedPeriod} 실제 vs 예측 데이터</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>제품명</TableHead>
                <TableHead className="text-right">실제</TableHead>
                <TableHead className="text-right">예측</TableHead>
                <TableHead className="text-right">편차</TableHead>
                <TableHead className="text-right">편차율</TableHead>
                <TableHead className="text-right">정확도</TableHead>
                <TableHead className="text-center">트렌드</TableHead>
                <TableHead className="text-center">상태</TableHead>
                <TableHead className="text-center">분석</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item) => (
                <TableRow key={item.sku} className="hover:bg-muted/50">
                  <TableCell className="font-mono">{item.sku}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-right font-medium">
                    {item.actual.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {item.forecast.toLocaleString()}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${getVarianceColor(item.variancePercent)}`}>
                    {item.variance > 0 ? '+' : ''}{item.variance.toLocaleString()}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${getVarianceColor(item.variancePercent)}`}>
                    {item.variancePercent > 0 ? '+' : ''}{item.variancePercent.toFixed(1)}%
                  </TableCell>
                  <TableCell className={`text-right font-medium ${getAccuracyColor(item.accuracy)}`}>
                    {item.accuracy.toFixed(1)}%
                  </TableCell>
                  <TableCell className="text-center">
                    {getTrendIcon(item.trend)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(item.status)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${item.accuracy}%` }}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {sortedData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              선택한 조건에 맞는 데이터가 없습니다.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Variance Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>편차 분포 분석</CardTitle>
          <CardDescription>예측 편차의 분포 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="font-medium text-green-600">정확 (±5% 이내)</h4>
              <p className="text-2xl font-semibold">
                {sortedData.filter(item => Math.abs(item.variancePercent) <= 5).length}
              </p>
              <Progress 
                value={(sortedData.filter(item => Math.abs(item.variancePercent) <= 5).length / sortedData.length) * 100} 
                className="mt-2"
              />
            </div>
            
            <div className="text-center">
              <h4 className="font-medium text-yellow-600">보통 (±15% 이내)</h4>
              <p className="text-2xl font-semibold">
                {sortedData.filter(item => Math.abs(item.variancePercent) > 5 && Math.abs(item.variancePercent) <= 15).length}
              </p>
              <Progress 
                value={(sortedData.filter(item => Math.abs(item.variancePercent) > 5 && Math.abs(item.variancePercent) <= 15).length / sortedData.length) * 100} 
                className="mt-2"
              />
            </div>
            
            <div className="text-center">
              <h4 className="font-medium text-red-600">부정확 (±15% 초과)</h4>
              <p className="text-2xl font-semibold">
                {sortedData.filter(item => Math.abs(item.variancePercent) > 15).length}
              </p>
              <Progress 
                value={(sortedData.filter(item => Math.abs(item.variancePercent) > 15).length / sortedData.length) * 100} 
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}