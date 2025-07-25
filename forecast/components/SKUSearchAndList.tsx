import { useState } from "react"
import { Search, Plus, Package, User, Calendar } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"

// Mock SKU data
const mockSKUs = [
  {
    id: "SKU-A001",
    name: "갤럭시 스마트폰",
    category: "전자제품",
    tca: "TCA-001",
    inn: "INN-A001",
    assignee: "김담당자",
    status: "active",
    reorderPoint: 50,
    currentStock: 25,
    discontinued: false,
    createdDate: "2024-01-15",
    lastModified: "2024-07-20"
  },
  {
    id: "SKU-B203",
    name: "데님 청바지",
    category: "의류",
    tca: "TCA-002",
    inn: "INN-B203",
    assignee: "이관리자",
    status: "active",
    reorderPoint: 30,
    currentStock: 15,
    discontinued: false,
    createdDate: "2024-02-10",
    lastModified: "2024-07-18"
  },
  {
    id: "SKU-C105",
    name: "신라면 컵라면",
    category: "식품",
    tca: "TCA-003",
    inn: "INN-C105",
    assignee: "박팀장",
    status: "low_stock",
    reorderPoint: 100,
    currentStock: 0,
    discontinued: false,
    createdDate: "2024-03-05",
    lastModified: "2024-07-25"
  },
  {
    id: "SKU-D078",
    name: "화이트닝 크림",
    category: "화장품",
    tca: "TCA-004",
    inn: "INN-D078",
    assignee: "최분석가",
    status: "active",
    reorderPoint: 20,
    currentStock: 35,
    discontinued: false,
    createdDate: "2024-04-12",
    lastModified: "2024-07-22"
  },
  {
    id: "SKU-E234",
    name: "무선 이어폰",
    category: "전자제품",
    tca: "TCA-005",
    inn: "INN-E234",
    assignee: "정담당자",
    status: "active",
    reorderPoint: 40,
    currentStock: 60,
    discontinued: false,
    createdDate: "2024-05-20",
    lastModified: "2024-07-24"
  },
  {
    id: "SKU-F456",
    name: "세탁세제",
    category: "생활용품",
    tca: "TCA-006",
    inn: "INN-F456",
    assignee: "김담당자",
    status: "discontinued",
    reorderPoint: 25,
    currentStock: 10,
    discontinued: true,
    createdDate: "2024-01-30",
    lastModified: "2024-06-15"
  }
]

function getStatusBadge(status: string) {
  switch (status) {
    case 'active':
      return <Badge variant="secondary" className="bg-green-100 text-green-800">활성</Badge>
    case 'low_stock':
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">재고부족</Badge>
    case 'discontinued':
      return <Badge variant="destructive">단종</Badge>
    default:
      return <Badge variant="outline">알 수 없음</Badge>
  }
}

interface SKUSearchAndListProps {
  onSKUSelect: (sku: any) => void
  onNewSKU: () => void
  selectedSKUId?: string
}

export function SKUSearchAndList({ onSKUSelect, onNewSKU, selectedSKUId }: SKUSearchAndListProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSKUs = mockSKUs.filter(sku => 
    sku.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sku.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sku.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sku.tca.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      {/* Search Bar and New Button */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="SKU 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={onNewSKU}>
          <Plus className="w-4 h-4 mr-2" />
          신규
        </Button>
      </div>

      {/* SKU List */}
      <div className="space-y-2">
        <h3>SKU 리스트</h3>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredSKUs.map((sku) => (
            <Card
              key={sku.id}
              className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                selectedSKUId === sku.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => onSKUSelect(sku)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <Package className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="truncate">{sku.name}</h4>
                        {getStatusBadge(sku.status)}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{sku.id}</span>
                        <span>{sku.category}</span>
                        <span>TCA: {sku.tca}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {sku.assignee}
                        </span>
                        <span>재고: {sku.currentStock}개</span>
                        <span>재주문점: {sku.reorderPoint}개</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredSKUs.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            검색 조건에 맞는 SKU가 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}