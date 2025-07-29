import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { AlertTriangle, Clock, CheckCircle, XCircle, TrendingUp, TrendingDown } from "lucide-react"

const mockIssuesData = {
  summary: {
    total: 45,
    critical: 8,
    warning: 15,
    resolved: 22,
    avgResolutionTime: "2.3일"
  },
  categories: [
    {
      type: "재고 부족",
      count: 12,
      severity: "critical",
      trend: "up",
      description: "예측 대비 재고 부족"
    },
    {
      type: "공급 지연",
      count: 8,
      severity: "warning", 
      trend: "stable",
      description: "공급업체 납기 지연"
    },
    {
      type: "예측 오차",
      count: 10,
      severity: "warning",
      trend: "down",
      description: "예측 정확도 기준 미달"
    },
    {
      type: "품질 문제",
      count: 5,
      severity: "critical",
      trend: "up",
      description: "품질 기준 미달 제품"
    },
    {
      type: "유통기한",
      count: 10,
      severity: "warning",
      trend: "stable", 
      description: "유통기한 임박 제품"
    }
  ],
  recentIssues: [
    {
      id: "ISS-001",
      sku: "SKU-12345",
      skuName: "아스피린 100mg",
      type: "재고 부족",
      severity: "critical",
      createdAt: "2024-01-15 09:30",
      assignee: "김약사",
      status: "진행중"
    },
    {
      id: "ISS-002", 
      sku: "SKU-12346",
      skuName: "메트포민 500mg",
      type: "공급 지연",
      severity: "warning",
      createdAt: "2024-01-14 14:20",
      assignee: "이관리",
      status: "대기"
    },
    {
      id: "ISS-003",
      sku: "SKU-12347", 
      skuName: "로사르탄 50mg",
      type: "예측 오차",
      severity: "warning",
      createdAt: "2024-01-14 11:15",
      assignee: "박분석",
      status: "해결됨"
    }
  ]
}

export function SKUIssuesSummary() {
  const { summary, categories, recentIssues } = mockIssuesData

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">긴급</Badge>
      case "warning":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">주의</Badge>
      case "normal":
        return <Badge variant="default">일반</Badge>
      default:
        return <Badge variant="outline">{severity}</Badge>
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "normal":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return null
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case "stable":
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />
      default:
        return null
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "진행중":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">진행중</Badge>
      case "대기":
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">대기</Badge>
      case "해결됨":
        return <Badge variant="default" className="bg-green-100 text-green-800">해결됨</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">총 이슈</p>
                <p className="text-2xl font-bold">{summary.total}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">긴급</p>
                <p className="text-2xl font-bold text-red-600">{summary.critical}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">주의</p>
                <p className="text-2xl font-bold text-yellow-600">{summary.warning}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">해결됨</p>
                <p className="text-2xl font-bold text-green-600">{summary.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issue Categories */}
      <Card>
        <CardHeader>
          <CardTitle>이슈 카테고리별 현황</CardTitle>
          <CardDescription>각 카테고리별 이슈 발생 현황 및 트렌드</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3 flex-1">
                  {getSeverityIcon(category.severity)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{category.type}</h4>
                      {getSeverityBadge(category.severity)}
                      {getTrendIcon(category.trend)}
                    </div>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">{category.count}</p>
                  <p className="text-xs text-muted-foreground">건</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Issues */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>최근 이슈</CardTitle>
              <CardDescription>최근 발생한 주요 이슈들</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              전체 보기
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentIssues.map((issue) => (
              <div key={issue.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
                <div className="flex items-center gap-3 flex-1">
                  {getSeverityIcon(issue.severity)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{issue.skuName}</h4>
                      <span className="text-xs text-muted-foreground font-mono">({issue.sku})</span>
                      {getSeverityBadge(issue.severity)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{issue.type}</span>
                      <span>담당자: {issue.assignee}</span>
                      <span>{issue.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(issue.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resolution Progress */}
      <Card>
        <CardHeader>
          <CardTitle>해결 진행률</CardTitle>
          <CardDescription>이슈 해결 현황 및 평균 처리 시간</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">전체 해결률</span>
                <span className="text-sm font-medium">{Math.round((summary.resolved / summary.total) * 100)}%</span>
              </div>
              <Progress value={(summary.resolved / summary.total) * 100} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">평균 해결 시간:</span>
                <span className="font-medium">{summary.avgResolutionTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">이번 주 해결:</span>
                <span className="font-medium">{summary.resolved}건</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}