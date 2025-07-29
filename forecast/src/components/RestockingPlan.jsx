import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { Progress } from "./ui/progress"
import { AlertTriangle, Clock, Package, TrendingUp, Calendar, CheckCircle, Edit, Save, X } from "lucide-react"

const mockRestockData = [
  {
    id: "RSP-001",
    sku: "SKU-12345",
    name: "아스피린 100mg",
    currentStock: 150,
    reorderPoint: 500,
    maxStock: 2000,
    forecastDemand: 1420,
    recommendedOrder: 1850,
    urgency: "critical",
    leadTime: 7,
    supplier: "한국제약",
    unitCost: 150,
    totalCost: 277500,
    stockoutRisk: 85,
    daysUntilStockout: 3,
    lastOrderDate: "2024-01-10",
    status: "pending"
  },
  {
    id: "RSP-002", 
    sku: "SKU-12346",
    name: "메트포민 500mg",
    currentStock: 600,
    reorderPoint: 400,
    maxStock: 1500,
    forecastDemand: 950,
    recommendedOrder: 900,
    urgency: "medium",
    leadTime: 5,
    supplier: "대한약품",
    unitCost: 200,
    totalCost: 180000,
    stockoutRisk: 25,
    daysUntilStockout: 15,
    lastOrderDate: "2024-01-05",
    status: "approved"
  },
  {
    id: "RSP-003",
    sku: "SKU-12347",
    name: "로사르탄 50mg", 
    currentStock: 320,
    reorderPoint: 300,
    maxStock: 1200,
    forecastDemand: 520,
    recommendedOrder: 880,
    urgency: "high",
    leadTime: 10,
    supplier: "신세계제약",
    unitCost: 180,
    totalCost: 158400,
    stockoutRisk: 60,
    daysUntilStockout: 8,
    lastOrderDate: "2023-12-28",
    status: "pending"
  },
  {
    id: "RSP-004",
    sku: "SKU-12348", 
    name: "오메프라졸 20mg",
    currentStock: 850,
    reorderPoint: 400,
    maxStock: 1500,
    forecastDemand: 780,
    recommendedOrder: 650,
    urgency: "low",
    leadTime: 6,
    supplier: "글로벌파마",
    unitCost: 220,
    totalCost: 143000,
    stockoutRisk: 15,
    daysUntilStockout: 25,
    lastOrderDate: "2024-01-12",
    status: "planned"
  }
]

export function RestockingPlan() {
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const [filterUrgency, setFilterUrgency] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredData = mockRestockData.filter(item => {
    const urgencyMatch = filterUrgency === "all" || item.urgency === filterUrgency
    const statusMatch = filterStatus === "all" || item.status === filterStatus
    return urgencyMatch && statusMatch
  })

  const handleEdit = (item) => {
    setEditingId(item.id)
    setEditData({ ...item })
  }

  const handleSave = () => {
    // Save logic here
    console.log("Saving restock plan:", editData)
    setEditingId(null)
    setEditData({})
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({})
  }

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case "critical":
        return <Badge variant="destructive">긴급</Badge>
      case "high":
        return <Badge variant="destructive" className="bg-orange-100 text-orange-800">높음</Badge>
      case "medium":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">보통</Badge>
      case "low":
        return <Badge variant="outline" className="bg-green-100 text-green-800">낮음</Badge>
      default:
        return <Badge variant="outline">{urgency}</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">대기중</Badge>
      case "approved":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">승인됨</Badge>
      case "planned":
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">계획됨</Badge>
      case "ordered":
        return <Badge variant="default" className="bg-green-100 text-green-800">주문됨</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStockoutRiskColor = (risk) => {
    if (risk >= 70) return "text-red-600"
    if (risk >= 40) return "text-yellow-600"
    return "text-green-600"
  }

  const summaryStats = {
    totalPlans: filteredData.length,
    criticalPlans: filteredData.filter(item => item.urgency === "critical").length,
    totalCost: filteredData.reduce((sum, item) => sum + item.totalCost, 0),
    avgLeadTime: Math.round(filteredData.reduce((sum, item) => sum + item.leadTime, 0) / filteredData.length)
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">총 재주문 계획</p>
                <p className="text-2xl font-semibold">{summaryStats.totalPlans}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">긴급 처리</p>
                <p className="text-2xl font-semibold text-red-600">{summaryStats.criticalPlans}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">총 예상 비용</p>
                <p className="text-2xl font-semibold">₩{summaryStats.totalCost.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">평균 리드타임</p>
                <p className="text-2xl font-semibold">{summaryStats.avgLeadTime}일</p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>재주문 계획 관리</CardTitle>
          <CardDescription>SKU별 재주문 계획 및 우선순위 관리</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <Select value={filterUrgency} onValueChange={setFilterUrgency}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="긴급도" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 긴급도</SelectItem>
                <SelectItem value="critical">긴급</SelectItem>
                <SelectItem value="high">높음</SelectItem>
                <SelectItem value="medium">보통</SelectItem>
                <SelectItem value="low">낮음</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 상태</SelectItem>
                <SelectItem value="pending">대기중</SelectItem>
                <SelectItem value="approved">승인됨</SelectItem>
                <SelectItem value="planned">계획됨</SelectItem>
                <SelectItem value="ordered">주문됨</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto flex gap-2">
              <Button variant="outline">
                일괄 승인
              </Button>
              <Button>
                새 계획 생성
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Restocking Plans Table */}
      <Card>
        <CardHeader>
          <CardTitle>재주문 계획 목록</CardTitle>
          <CardDescription>각 SKU별 재주문 세부 계획</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SKU</TableHead>
                <TableHead>제품명</TableHead>
                <TableHead className="text-center">긴급도</TableHead>
                <TableHead className="text-right">현재재고</TableHead>
                <TableHead className="text-right">권장주문량</TableHead>
                <TableHead className="text-right">예상비용</TableHead>
                <TableHead className="text-center">리드타임</TableHead>
                <TableHead className="text-center">재고부족위험</TableHead>
                <TableHead className="text-center">상태</TableHead>
                <TableHead className="text-center">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono">{item.sku}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">공급업체: {item.supplier}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {getUrgencyBadge(item.urgency)}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingId === item.id ? (
                      <Input
                        type="number"
                        value={editData.currentStock || item.currentStock}
                        onChange={(e) => handleInputChange("currentStock", parseInt(e.target.value))}
                        className="w-20 text-right"
                      />
                    ) : (
                      <span className={`font-medium ${
                        item.currentStock <= item.reorderPoint ? 'text-red-600' : ''
                      }`}>
                        {item.currentStock.toLocaleString()}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingId === item.id ? (
                      <Input
                        type="number"
                        value={editData.recommendedOrder || item.recommendedOrder}
                        onChange={(e) => handleInputChange("recommendedOrder", parseInt(e.target.value))}
                        className="w-24 text-right"
                      />
                    ) : (
                      <span className="font-medium">
                        {item.recommendedOrder.toLocaleString()}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="font-medium">
                      ₩{item.totalCost.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-sm">{item.leadTime}일</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="space-y-1">
                      <Progress value={item.stockoutRisk} className="w-16 h-2" />
                      <span className={`text-xs ${getStockoutRiskColor(item.stockoutRisk)}`}>
                        {item.stockoutRisk}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(item.status)}
                  </TableCell>
                  <TableCell className="text-center">
                    {editingId === item.id ? (
                      <div className="flex gap-1">
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="ghost" onClick={() => handleEdit(item)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detailed Plan for Selected Item */}
      {editingId && (
        <Card>
          <CardHeader>
            <CardTitle>상세 재주문 계획</CardTitle>
            <CardDescription>선택된 SKU의 재주문 세부 계획</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>SKU 정보</Label>
                  <div className="mt-1 p-3 bg-muted rounded-lg">
                    <p className="font-medium">{editData.name}</p>
                    <p className="text-sm text-muted-foreground">{editData.sku}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reorder-point">재주문점</Label>
                    <Input
                      id="reorder-point"
                      type="number"
                      value={editData.reorderPoint}
                      onChange={(e) => handleInputChange("reorderPoint", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-stock">최대재고</Label>
                    <Input
                      id="max-stock"
                      type="number"
                      value={editData.maxStock}
                      onChange={(e) => handleInputChange("maxStock", parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="forecast-demand">예측수요</Label>
                  <Input
                    id="forecast-demand"
                    type="number"
                    value={editData.forecastDemand}
                    onChange={(e) => handleInputChange("forecastDemand", parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>비용 정보</Label>
                  <div className="mt-1 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">단위 비용:</span>
                      <span className="font-medium">₩{editData.unitCost?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">총 비용:</span>
                      <span className="font-medium">₩{((editData.recommendedOrder || 0) * (editData.unitCost || 0)).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>위험 평가</Label>
                  <div className="mt-1 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">재고부족 위험:</span>
                      <Badge variant={editData.stockoutRisk > 70 ? "destructive" : editData.stockoutRisk > 40 ? "secondary" : "default"}>
                        {editData.stockoutRisk}%
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">예상 재고부족일:</span>
                      <span className="font-medium">{editData.daysUntilStockout}일 후</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-2">
                  <Button onClick={handleSave} className="flex-1">
                    <Save className="w-4 h-4 mr-2" />
                    저장
                  </Button>
                  <Button variant="outline" onClick={handleCancel}>
                    취소
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}