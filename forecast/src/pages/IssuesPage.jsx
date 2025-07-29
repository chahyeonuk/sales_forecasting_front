import { useState } from "react"
import { IssueManagementSidebar } from "../components/IssueManagementSidebar"
import { IssueList } from "../components/IssueList"
import { IssueDetailPanel } from "../components/IssueDetailPanel"
import { RestockingPlan } from "../components/RestockingPlan"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { AlertTriangle, Clock, CheckCircle, Plus, Filter } from "lucide-react"

export function IssuesPage() {
  const [selectedIssue, setSelectedIssue] = useState(null)
  
  const issueStats = {
    total: 87,
    critical: 23,
    warning: 45,
    normal: 19,
    resolved: 156
  }

  const priorityDistribution = [
    { priority: "긴급", count: 23, percentage: 26, color: "bg-red-500" },
    { priority: "높음", count: 31, percentage: 36, color: "bg-orange-500" },
    { priority: "보통", count: 24, percentage: 28, color: "bg-yellow-500" },
    { priority: "낮음", count: 9, percentage: 10, color: "bg-green-500" }
  ]

  const recentIssues = [
    {
      id: "ISS-001",
      title: "SKU-12345 재고 부족 예상",
      description: "3일 후 재고 소진 예상, 즉시 재발주 필요",
      priority: "긴급",
      status: "열림",
      assignee: "김재고",
      created: "2024-01-15",
      dueDate: "2024-01-18",
      tags: ["재고부족", "긴급발주"]
    },
    {
      id: "ISS-002", 
      title: "TCA-002 예측 정확도 하락",
      description: "예측 정확도가 70% 미만으로 하락, 모델 재검토 필요",
      priority: "높음",
      status: "진행",
      assignee: "이분석",
      created: "2024-01-14",
      dueDate: "2024-01-21",
      tags: ["정확도", "모델검토"]
    },
    {
      id: "ISS-003",
      title: "신규 SKU 마스터 데이터 누락",
      description: "5개 신규 SKU의 TCA 매핑 정보 누락",
      priority: "보통",
      status: "대기",
      assignee: "박마스터",
      created: "2024-01-13",
      dueDate: "2024-01-20",
      tags: ["마스터데이터", "신규SKU"]
    }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case '긴급': return 'destructive'
      case '높음': return 'secondary'
      case '보통': return 'outline'
      case '낮음': return 'default'
      default: return 'outline'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case '열림': return 'text-red-600'
      case '진행': return 'text-blue-600' 
      case '대기': return 'text-yellow-600'
      case '완료': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="flex h-full">
      <IssueManagementSidebar />
      <div className="flex-1 p-6 space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">이슈 관리</h1>
            <p className="text-muted-foreground">
              재고 부족, 예측 정확도, 데이터 품질 이슈 통합 관리
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              필터
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              새 이슈
            </Button>
          </div>
        </div>

        {/* Issue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">전체 이슈</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{issueStats.total}</div>
              <p className="text-xs text-muted-foreground">활성 이슈</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                긴급
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{issueStats.critical}</div>
              <p className="text-xs text-muted-foreground">즉시 처리 필요</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                <Clock className="h-4 w-4 text-yellow-600" />
                주의
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{issueStats.warning}</div>
              <p className="text-xs text-muted-foreground">모니터링 필요</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">일반</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{issueStats.normal}</div>
              <p className="text-xs text-muted-foreground">일반 이슈</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-600" />
                해결완료
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{issueStats.resolved}</div>
              <p className="text-xs text-muted-foreground">이번 달</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">활성 이슈</TabsTrigger>
            <TabsTrigger value="analytics">이슈 분석</TabsTrigger>
            <TabsTrigger value="restock">재발주 계획</TabsTrigger>
            <TabsTrigger value="history">이슈 히스토리</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>활성 이슈 목록</CardTitle>
                    <CardDescription>현재 처리 중인 이슈들</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentIssues.map((issue) => (
                        <div 
                          key={issue.id} 
                          className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => setSelectedIssue(issue)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{issue.id}</h4>
                              <Badge variant={getPriorityColor(issue.priority)}>
                                {issue.priority}
                              </Badge>
                            </div>
                            <span className={`text-sm ${getStatusColor(issue.status)}`}>
                              {issue.status}
                            </span>
                          </div>
                          
                          <h3 className="font-semibold mb-2">{issue.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            {issue.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <div className="flex gap-4">
                              <span>담당: {issue.assignee}</span>
                              <span>생성: {issue.created}</span>
                              <span>마감: {issue.dueDate}</span>
                            </div>
                            <div className="flex gap-1">
                              {issue.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="xl:col-span-1">
                {selectedIssue ? (
                  <IssueDetailPanel issue={selectedIssue} />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>이슈 상세</CardTitle>
                      <CardDescription>이슈를 선택하면 상세 정보가 표시됩니다</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-muted-foreground">
                        <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>좌측에서 이슈를 선택하세요</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>우선순위별 분포</CardTitle>
                  <CardDescription>이슈 중요도 현황</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {priorityDistribution.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-16 text-sm">{item.priority}</div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">{item.count}건</span>
                            <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className={`${item.color} h-2 rounded-full transition-all`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>해결 트렌드</CardTitle>
                  <CardDescription>최근 7일간 이슈 해결 현황</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">평균 해결 시간</span>
                      <span className="font-semibold">2.3일</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">금일 신규 이슈</span>
                      <span className="font-semibold">5건</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">금일 해결 이슈</span>
                      <span className="font-semibold text-green-600">8건</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">미해결률</span>
                      <span className="font-semibold">12.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="restock" className="space-y-4">
            <RestockingPlan />
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>이슈 히스토리</CardTitle>
                <CardDescription>해결된 이슈 이력</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>해결된 이슈가 없습니다.</p>
                  <p className="text-sm">이슈를 해결하면 여기에 기록됩니다.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}