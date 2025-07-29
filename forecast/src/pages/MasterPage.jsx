import { useState } from "react"
import { MasterDataSidebar } from "../components/MasterDataSidebar"
import { SKUSearchAndList } from "../components/SKUSearchAndList"
import { SKUDetailForm } from "../components/SKUDetailForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Plus, Search, Filter, Download, Upload } from "lucide-react"

export function MasterPage() {
  const [selectedSKU, setSelectedSKU] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  
  const masterDataStats = {
    totalSKUs: 1247,
    activeSKUs: 1089,
    discontinuedSKUs: 158,
    pendingSKUs: 23
  }

  const recentActivities = [
    {
      id: 1,
      action: "SKU 추가",
      sku: "SKU-12450",
      user: "김관리",
      date: "2024-01-15 14:30",
      type: "create"
    },
    {
      id: 2,
      action: "재발주점 수정",
      sku: "SKU-12234",
      user: "이담당",
      date: "2024-01-15 12:15",
      type: "update"
    },
    {
      id: 3,
      action: "SKU 단종",
      sku: "SKU-11890",
      user: "박매니저",
      date: "2024-01-14 16:45",
      type: "discontinue"
    },
    {
      id: 4,
      action: "TCA 변경",
      sku: "SKU-12001",
      user: "최분석",
      date: "2024-01-14 11:20",
      type: "update"
    }
  ]

  const getActivityIcon = (type) => {
    switch (type) {
      case 'create': return '➕'
      case 'update': return '✏️'
      case 'discontinue': return '🚫'
      default: return '📝'
    }
  }

  const getActivityColor = (type) => {
    switch (type) {
      case 'create': return 'text-green-600'
      case 'update': return 'text-blue-600'
      case 'discontinue': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="flex h-full">
      <MasterDataSidebar />
      <div className="flex-1 p-6 space-y-6">
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">마스터 데이터 관리</h1>
            <p className="text-muted-foreground">
              SKU 정보, TCA/INN 매핑, 재발주점 관리
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              내보내기
            </Button>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              가져오기
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              새 SKU 추가
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">전체 SKU</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{masterDataStats.totalSKUs.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">등록된 전체 SKU</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">활성 SKU</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {masterDataStats.activeSKUs.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">판매 중인 SKU</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">단종 SKU</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {masterDataStats.discontinuedSKUs.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">단종된 SKU</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">승인 대기</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {masterDataStats.pendingSKUs.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">승인 대기 중</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle>SKU 검색 및 필터</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="SKU 코드 또는 제품명으로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                필터
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="list" className="space-y-4">
          <TabsList>
            <TabsTrigger value="list">SKU 목록</TabsTrigger>
            <TabsTrigger value="categories">카테고리 관리</TabsTrigger>
            <TabsTrigger value="bulk">일괄 작업</TabsTrigger>
            <TabsTrigger value="activity">활동 로그</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <SKUSearchAndList 
                  searchQuery={searchQuery}
                  onSKUSelect={setSelectedSKU}
                />
              </div>
              <div className="xl:col-span-1">
                {selectedSKU ? (
                  <SKUDetailForm sku={selectedSKU} />
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>SKU 상세 정보</CardTitle>
                      <CardDescription>SKU를 선택하면 상세 정보가 표시됩니다</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-muted-foreground">
                        <p>좌측 목록에서 SKU를 선택하세요</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>TCA/INN 카테고리 관리</CardTitle>
                <CardDescription>치료군 및 성분 카테고리 관리</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">TCA (치료군)</h4>
                    <div className="space-y-2">
                      {['TCA-001', 'TCA-002', 'TCA-003', 'TCA-004', 'TCA-005'].map((tca) => (
                        <div key={tca} className="flex justify-between items-center p-2 border rounded">
                          <span>{tca}</span>
                          <Badge variant="outline">활성</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">INN (성분명)</h4>
                    <div className="space-y-2">
                      {['INN-001', 'INN-002', 'INN-003', 'INN-004', 'INN-005'].map((inn) => (
                        <div key={inn} className="flex justify-between items-center p-2 border rounded">
                          <span>{inn}</span>
                          <Badge variant="outline">활성</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>일괄 작업</CardTitle>
                <CardDescription>여러 SKU에 대한 일괄 수정 및 업데이트</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Upload className="w-6 h-6 mb-2" />
                    일괄 업로드
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Download className="w-6 h-6 mb-2" />
                    일괄 다운로드
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Filter className="w-6 h-6 mb-2" />
                    일괄 수정
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>최근 활동</CardTitle>
                <CardDescription>마스터 데이터 변경 이력</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="text-lg">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">
                          SKU: {activity.sku} • {activity.user} • {activity.date}
                        </p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={getActivityColor(activity.type)}
                      >
                        {activity.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}