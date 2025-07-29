import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Search, Filter, Eye, Edit, AlertTriangle, CheckCircle } from "lucide-react"

const mockSKUData = [
  {
    id: "SKU-001",
    name: "아스피린 100mg",
    tca: "TCA-001",
    tcaName: "심혈관계",
    stock: 1250,
    forecast: 1420,
    accuracy: 98.5,
    status: "normal",
    lastUpdated: "2024-01-15"
  },
  {
    id: "SKU-002", 
    name: "메트포민 500mg",
    tca: "TCA-005",
    tcaName: "내분비계",
    stock: 890,
    forecast: 950,
    accuracy: 96.2,
    status: "warning",
    lastUpdated: "2024-01-14"
  },
  {
    id: "SKU-003",
    name: "로사르탄 50mg", 
    tca: "TCA-001",
    tcaName: "심혈관계",
    stock: 450,
    forecast: 520,
    accuracy: 94.8,
    status: "critical",
    lastUpdated: "2024-01-13"
  },
  {
    id: "SKU-004",
    name: "오메프라졸 20mg",
    tca: "TCA-002", 
    tcaName: "소화기계",
    stock: 760,
    forecast: 780,
    accuracy: 99.1,
    status: "normal",
    lastUpdated: "2024-01-15"
  },
  {
    id: "SKU-005",
    name: "살부타몰 흡입제",
    tca: "TCA-003",
    tcaName: "호흡기계", 
    stock: 320,
    forecast: 380,
    accuracy: 92.3,
    status: "warning",
    lastUpdated: "2024-01-12"
  }
]

export function SKUSearchAndList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTCA, setSelectedTCA] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedSKU, setSelectedSKU] = useState(null)

  const filteredData = mockSKUData.filter(sku => {
    const matchesSearch = sku.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sku.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTCA = selectedTCA === "all" || sku.tca === selectedTCA
    const matchesStatus = selectedStatus === "all" || sku.status === selectedStatus
    
    return matchesSearch && matchesTCA && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "normal":
        return <Badge variant="default" className="bg-green-100 text-green-800">정상</Badge>
      case "warning":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">주의</Badge>
      case "critical":
        return <Badge variant="destructive" className="bg-red-100 text-red-800">위험</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "normal":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>SKU 검색 및 목록</CardTitle>
          <CardDescription>등록된 SKU를 검색하고 관리하세요</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="SKU 코드 또는 제품명 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* TCA Filter */}
            <Select value={selectedTCA} onValueChange={setSelectedTCA}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="TCA 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 TCA</SelectItem>
                <SelectItem value="TCA-001">심혈관계</SelectItem>
                <SelectItem value="TCA-002">소화기계</SelectItem>
                <SelectItem value="TCA-003">호흡기계</SelectItem>
                <SelectItem value="TCA-004">신경계</SelectItem>
                <SelectItem value="TCA-005">내분비계</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="normal">정상</SelectItem>
                <SelectItem value="warning">주의</SelectItem>
                <SelectItem value="critical">위험</SelectItem>
              </SelectContent>
            </Select>

            <Button>
              <Filter className="w-4 h-4 mr-2" />
              필터 적용
            </Button>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <span>{filteredData.length}개의 SKU가 검색되었습니다</span>
            <div className="flex gap-4">
              <span>정상: {filteredData.filter(s => s.status === 'normal').length}</span>
              <span>주의: {filteredData.filter(s => s.status === 'warning').length}</span>
              <span>위험: {filteredData.filter(s => s.status === 'critical').length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SKU List Table */}
      <Card>
        <CardHeader>
          <CardTitle>SKU 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>상태</TableHead>
                <TableHead>SKU 코드</TableHead>
                <TableHead>제품명</TableHead>
                <TableHead>TCA</TableHead>
                <TableHead className="text-right">재고</TableHead>
                <TableHead className="text-right">예측량</TableHead>
                <TableHead className="text-right">정확도</TableHead>
                <TableHead>최종 업데이트</TableHead>
                <TableHead className="text-center">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((sku) => (
                <TableRow 
                  key={sku.id} 
                  className={`cursor-pointer hover:bg-muted/50 ${selectedSKU === sku.id ? 'bg-muted' : ''}`}
                  onClick={() => setSelectedSKU(sku.id)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(sku.status)}
                      {getStatusBadge(sku.status)}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{sku.id}</TableCell>
                  <TableCell className="font-medium">{sku.name}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-mono text-xs text-muted-foreground">{sku.tca}</div>
                      <div className="text-sm">{sku.tcaName}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`font-medium ${
                      sku.stock < sku.forecast * 0.8 ? 'text-red-600' : 
                      sku.stock < sku.forecast ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {sku.stock.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {sku.forecast.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge variant={sku.accuracy >= 95 ? "default" : "secondary"}>
                      {sku.accuracy}%
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {sku.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredData.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              검색 조건에 맞는 SKU가 없습니다.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected SKU Quick Info */}
      {selectedSKU && (
        <Card>
          <CardHeader>
            <CardTitle>선택된 SKU 정보</CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const sku = filteredData.find(s => s.id === selectedSKU)
              if (!sku) return null
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-medium">{sku.name}</h4>
                    <p className="text-sm text-muted-foreground">{sku.id}</p>
                  </div>
                  <div>
                    <h4 className="font-medium">재고 상태</h4>
                    <p className="text-sm">
                      현재: {sku.stock.toLocaleString()} / 예측: {sku.forecast.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">예측 정확도</h4>
                    <p className="text-sm">{sku.accuracy}%</p>
                  </div>
                </div>
              )
            })()}
          </CardContent>
        </Card>
      )}
    </div>
  )
}