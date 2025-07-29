import { useState } from "react"
import { AlertTriangle, Package, TrendingDown, Clock, Search, Filter, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"

// Mock issue data
const issuesData = [
  {
    id: "ISS-001",
    title: "갤럭시 스마트폰 품절",
    sku: "SKU-A001",
    type: "out_of_stock",
    priority: "high",
    createdDate: "2024-07-25",
    assignee: "김담당자",
    description: "인기 상품으로 재고 소진, 긴급 재입고 필요",
    affectedQuantity: 0,
    expectedRestock: "2024-07-28"
  },
  {
    id: "ISS-002", 
    title: "데님 청바지 대량 반품",
    sku: "SKU-B203",
    type: "high_returns",
    priority: "medium",
    createdDate: "2024-07-24",
    assignee: "이관리자",
    description: "사이즈 불만족으로 인한 반품 급증",
    affectedQuantity: 45,
    expectedRestock: null
  },
  {
    id: "ISS-003",
    title: "무선 이어폰 재고 부족 경고",
    sku: "SKU-E234", 
    type: "low_stock",
    priority: "medium",
    createdDate: "2024-07-24",
    assignee: "박팀장",
    description: "현재 재고 15개, 안전 재고 수준 미달",
    affectedQuantity: 15,
    expectedRestock: "2024-07-26"
  },
  {
    id: "ISS-004",
    title: "화이트닝 크림 품질 클레임",
    sku: "SKU-D078",
    type: "quality_issue",
    priority: "high", 
    createdDate: "2024-07-23",
    assignee: "최분석가",
    description: "고객 불만 접수, 제품 품질 검토 필요",
    affectedQuantity: 28,
    expectedRestock: null
  },
  {
    id: "ISS-005",
    title: "컵라면 유통기한 임박",
    sku: "SKU-C105",
    type: "expiry_warning",
    priority: "low",
    createdDate: "2024-07-23",
    assignee: "정담당자",
    description: "30일 이내 유통기한 만료 예정",
    affectedQuantity: 120,
    expectedRestock: "2024-07-30"
  },
  {
    id: "ISS-006",
    title: "생활용품 공급업체 지연",
    sku: "SKU-F456",
    type: "supplier_delay",
    priority: "medium",
    createdDate: "2024-07-22",
    assignee: "김담당자",
    description: "공급업체 생산 지연으로 입고 연기",
    affectedQuantity: 200,
    expectedRestock: "2024-08-05"
  }
]

function getIssueTypeIcon(type) {
  switch (type) {
    case 'out_of_stock':
      return <AlertTriangle className="w-4 h-4 text-red-600" />
    case 'low_stock':
      return <Package className="w-4 h-4 text-orange-600" />
    case 'high_returns':
      return <TrendingDown className="w-4 h-4 text-yellow-600" />
    case 'quality_issue':
      return <AlertTriangle className="w-4 h-4 text-purple-600" />
    case 'expiry_warning':
      return <Clock className="w-4 h-4 text-blue-600" />
    case 'supplier_delay':
      return <Clock className="w-4 h-4 text-gray-600" />
    default:
      return <AlertTriangle className="w-4 h-4" />
  }
}

function getIssueTypeName(type) {
  switch (type) {
    case 'out_of_stock': return '품절'
    case 'low_stock': return '재고부족'
    case 'high_returns': return '반품다량'
    case 'quality_issue': return '품질이슈'
    case 'expiry_warning': return '유통기한'
    case 'supplier_delay': return '공급지연'
    default: return '기타'
  }
}

function getPriorityBadge(priority) {
  switch (priority) {
    case 'high':
      return <Badge variant="destructive">긴급</Badge>
    case 'medium':
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">보통</Badge>
    case 'low':
      return <Badge variant="secondary" className="bg-green-100 text-green-800">낮음</Badge>
    default:
      return <Badge variant="outline">알 수 없음</Badge>
  }
}

export function IssueList({ onIssueSelect, selectedIssueId }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")

  const filteredIssues = issuesData.filter(issue => {
    const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || issue.type === filterType
    const matchesPriority = filterPriority === "all" || issue.priority === filterPriority
    
    return matchesSearch && matchesType && matchesPriority
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        <h3>이슈 리스트</h3>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="이슈 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 유형</SelectItem>
            <SelectItem value="out_of_stock">품절</SelectItem>
            <SelectItem value="low_stock">재고부족</SelectItem>
            <SelectItem value="high_returns">반품다량</SelectItem>
            <SelectItem value="quality_issue">품질이슈</SelectItem>
            <SelectItem value="expiry_warning">유통기한</SelectItem>
            <SelectItem value="supplier_delay">공급지연</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 우선순위</SelectItem>
            <SelectItem value="high">긴급</SelectItem>
            <SelectItem value="medium">보통</SelectItem>
            <SelectItem value="low">낮음</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Issue List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredIssues.map((issue) => (
          <Card 
            key={issue.id} 
            className={`cursor-pointer transition-colors hover:bg-accent/50 ${
              selectedIssueId === issue.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onIssueSelect(issue)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {getIssueTypeIcon(issue.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="truncate">{issue.title}</h4>
                      {getPriorityBadge(issue.priority)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{issue.sku}</span>
                      <Badge variant="outline" className="text-xs">
                        {getIssueTypeName(issue.type)}
                      </Badge>
                      <span>{issue.createdDate}</span>
                      <span>담당: {issue.assignee}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {issue.description}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          검색 조건에 맞는 이슈가 없습니다.
        </div>
      )}
    </div>
  )
}