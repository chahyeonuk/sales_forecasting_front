import { useState } from "react"
import { Package, Plus, Save, Calendar, Truck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"

// Mock restocking plan data
const mockRestockPlans = [
  {
    id: "RST-001",
    sku: "SKU-A001",
    productName: "갤럭시 스마트폰",
    currentStock: 0,
    plannedQuantity: 200,
    supplier: "삼성전자",
    orderDate: "2024-07-26",
    expectedDelivery: "2024-07-28",
    status: "ordered",
    cost: 40000000
  },
  {
    id: "RST-002",
    sku: "SKU-E234", 
    productName: "무선 이어폰",
    currentStock: 15,
    plannedQuantity: 100,
    supplier: "애플",
    orderDate: "2024-07-25",
    expectedDelivery: "2024-07-27",
    status: "planned",
    cost: 10000000
  }
]

interface RestockingPlanProps {
  selectedIssue?: any
}

export function RestockingPlan({ selectedIssue }: RestockingPlanProps) {
  const [restockPlans, setRestockPlans] = useState(mockRestockPlans)
  const [isAddingPlan, setIsAddingPlan] = useState(false)
  const [newPlan, setNewPlan] = useState({
    sku: selectedIssue?.sku || '',
    productName: '',
    currentStock: 0,
    plannedQuantity: 0,
    supplier: '',
    orderDate: '',
    expectedDelivery: '',
    cost: 0
  })

  const handleAddPlan = () => {
    const plan = {
      id: `RST-${String(restockPlans.length + 1).padStart(3, '0')}`,
      ...newPlan,
      status: 'planned'
    }
    setRestockPlans([...restockPlans, plan])
    setNewPlan({
      sku: selectedIssue?.sku || '',
      productName: '',
      currentStock: 0,
      plannedQuantity: 0,
      supplier: '',
      orderDate: '',
      expectedDelivery: '',
      cost: 0
    })
    setIsAddingPlan(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'planned':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">계획됨</Badge>
      case 'ordered':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">주문됨</Badge>
      case 'delivered':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">입고완료</Badge>
      case 'cancelled':
        return <Badge variant="destructive">취소됨</Badge>
      default:
        return <Badge variant="outline">알 수 없음</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            재입고 계획
          </CardTitle>
          <Button 
            size="sm" 
            onClick={() => setIsAddingPlan(true)}
            disabled={isAddingPlan}
          >
            <Plus className="w-4 h-4 mr-2" />
            계획 추가
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Add New Plan Form */}
        {isAddingPlan && (
          <Card className="border-dashed">
            <CardContent className="p-4 space-y-4">
              <h4>새 재입고 계획</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>SKU</Label>
                  <Input 
                    value={newPlan.sku}
                    onChange={(e) => setNewPlan({...newPlan, sku: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>상품명</Label>
                  <Input 
                    value={newPlan.productName}
                    onChange={(e) => setNewPlan({...newPlan, productName: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>현재 재고</Label>
                  <Input 
                    type="number"
                    value={newPlan.currentStock}
                    onChange={(e) => setNewPlan({...newPlan, currentStock: parseInt(e.target.value)})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>계획 수량</Label>
                  <Input 
                    type="number"
                    value={newPlan.plannedQuantity}
                    onChange={(e) => setNewPlan({...newPlan, plannedQuantity: parseInt(e.target.value)})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>예상 비용</Label>
                  <Input 
                    type="number"
                    value={newPlan.cost}
                    onChange={(e) => setNewPlan({...newPlan, cost: parseInt(e.target.value)})}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>공급업체</Label>
                  <Select value={newPlan.supplier} onValueChange={(value) => setNewPlan({...newPlan, supplier: value})}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="공급업체 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="삼성전자">삼성전자</SelectItem>
                      <SelectItem value="애플">애플</SelectItem>
                      <SelectItem value="LG전자">LG전자</SelectItem>
                      <SelectItem value="농심">농심</SelectItem>
                      <SelectItem value="아모레퍼시픽">아모레퍼시픽</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>주문 예정일</Label>
                  <Input 
                    type="date"
                    value={newPlan.orderDate}
                    onChange={(e) => setNewPlan({...newPlan, orderDate: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>입고 예정일</Label>
                  <Input 
                    type="date"
                    value={newPlan.expectedDelivery}
                    onChange={(e) => setNewPlan({...newPlan, expectedDelivery: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddPlan}>
                  <Save className="w-4 h-4 mr-2" />
                  저장
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsAddingPlan(false)}>
                  취소
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Restocking Plans Table */}
        <div>
          <h4 className="mb-4">재입고 계획 목록</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>계획 ID</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>상품명</TableHead>
                <TableHead className="text-right">현재재고</TableHead>
                <TableHead className="text-right">계획수량</TableHead>
                <TableHead>공급업체</TableHead>
                <TableHead>주문일</TableHead>
                <TableHead>입고예정</TableHead>
                <TableHead className="text-right">예상비용</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restockPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.id}</TableCell>
                  <TableCell>{plan.sku}</TableCell>
                  <TableCell>{plan.productName}</TableCell>
                  <TableCell className="text-right">{plan.currentStock}개</TableCell>
                  <TableCell className="text-right">{plan.plannedQuantity}개</TableCell>
                  <TableCell>{plan.supplier}</TableCell>
                  <TableCell>{plan.orderDate}</TableCell>
                  <TableCell>{plan.expectedDelivery}</TableCell>
                  <TableCell className="text-right">
                    {new Intl.NumberFormat('ko-KR').format(plan.cost)}원
                  </TableCell>
                  <TableCell>{getStatusBadge(plan.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary */}
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl">{restockPlans.length}</div>
                <div className="text-sm text-muted-foreground">총 계획 수</div>
              </div>
              <div>
                <div className="text-2xl">{restockPlans.reduce((sum, plan) => sum + plan.plannedQuantity, 0).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">총 계획 수량</div>
              </div>
              <div>
                <div className="text-2xl">{new Intl.NumberFormat('ko-KR').format(restockPlans.reduce((sum, plan) => sum + plan.cost, 0))}</div>
                <div className="text-sm text-muted-foreground">총 예상 비용 (원)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}