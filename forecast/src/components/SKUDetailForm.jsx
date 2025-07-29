import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Switch } from "./ui/switch"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Save, Edit, Archive, AlertTriangle, Calendar, User, Package } from "lucide-react"

const mockSKUData = {
  id: "SKU-12345",
  name: "아스피린 100mg",
  description: "해열, 진통, 소염 효과가 있는 의약품",
  tca: "TCA-001",
  tcaName: "심혈관계",
  inn: "Acetylsalicylic acid",
  manufacturer: "한국제약",
  category: "전문의약품",
  status: "active",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-15",
  assignee: "김약사",
  reorderPoint: 500,
  maxStock: 2000,
  currentStock: 1250,
  unit: "정",
  costPrice: 150,
  sellPrice: 200,
  isDiscontinued: false,
  notes: "정기적인 재고 관리 필요"
}

export function SKUDetailForm() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(mockSKUData)
  const [hasChanges, setHasChanges] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Save logic here
    setIsEditing(false)
    setHasChanges(false)
    console.log("Saving SKU data:", formData)
  }

  const handleCancel = () => {
    setFormData(mockSKUData)
    setIsEditing(false)
    setHasChanges(false)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-green-100 text-green-800">활성</Badge>
      case "discontinued":
        return <Badge variant="destructive">단종</Badge>
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">보류</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                SKU 상세 정보
              </CardTitle>
              <CardDescription>
                {formData.id} - {formData.name}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(formData.status)}
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  편집
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleCancel}>
                    취소
                  </Button>
                  <Button onClick={handleSave} disabled={!hasChanges}>
                    <Save className="w-4 h-4 mr-2" />
                    저장
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">기본 정보</TabsTrigger>
          <TabsTrigger value="classification">분류 정보</TabsTrigger>
          <TabsTrigger value="inventory">재고 관리</TabsTrigger>
          <TabsTrigger value="pricing">가격 정보</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sku-id">SKU 코드</Label>
                  <Input
                    id="sku-id"
                    value={formData.id}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sku-name">제품명</Label>
                  <Input
                    id="sku-name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufacturer">제조사</Label>
                  <Input
                    id="manufacturer"
                    value={formData.manufacturer}
                    onChange={(e) => handleInputChange("manufacturer", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">카테고리</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="전문의약품">전문의약품</SelectItem>
                      <SelectItem value="일반의약품">일반의약품</SelectItem>
                      <SelectItem value="의료기기">의료기기</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">제품 설명</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">특이사항</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  disabled={!isEditing}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>분류 및 담당자 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tca">TCA 코드</Label>
                  <Select
                    value={formData.tca}
                    onValueChange={(value) => handleInputChange("tca", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TCA-001">TCA-001 - 심혈관계</SelectItem>
                      <SelectItem value="TCA-002">TCA-002 - 소화기계</SelectItem>
                      <SelectItem value="TCA-003">TCA-003 - 호흡기계</SelectItem>
                      <SelectItem value="TCA-004">TCA-004 - 신경계</SelectItem>
                      <SelectItem value="TCA-005">TCA-005 - 내분비계</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inn">INN (국제일반명)</Label>
                  <Input
                    id="inn"
                    value={formData.inn}
                    onChange={(e) => handleInputChange("inn", e.target.value)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignee">담당자</Label>
                  <Select
                    value={formData.assignee}
                    onValueChange={(value) => handleInputChange("assignee", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="김약사">김약사</SelectItem>
                      <SelectItem value="이관리">이관리</SelectItem>
                      <SelectItem value="박분석">박분석</SelectItem>
                      <SelectItem value="최담당">최담당</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">상태</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">활성</SelectItem>
                      <SelectItem value="discontinued">단종</SelectItem>
                      <SelectItem value="pending">보류</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>단종 여부</Label>
                  <p className="text-sm text-muted-foreground">
                    단종된 제품으로 설정하면 예측에서 제외됩니다
                  </p>
                </div>
                <Switch
                  checked={formData.isDiscontinued}
                  onCheckedChange={(checked) => handleInputChange("isDiscontinued", checked)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>재고 관리 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-stock">현재 재고</Label>
                  <Input
                    id="current-stock"
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => handleInputChange("currentStock", parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reorder-point">재주문점</Label>
                  <Input
                    id="reorder-point"
                    type="number"
                    value={formData.reorderPoint}
                    onChange={(e) => handleInputChange("reorderPoint", parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="max-stock">최대 재고</Label>
                  <Input
                    id="max-stock"
                    type="number"
                    value={formData.maxStock}
                    onChange={(e) => handleInputChange("maxStock", parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">단위</Label>
                <Select
                  value={formData.unit}
                  onValueChange={(value) => handleInputChange("unit", value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="정">정</SelectItem>
                    <SelectItem value="캡슐">캡슐</SelectItem>
                    <SelectItem value="ml">ml</SelectItem>
                    <SelectItem value="병">병</SelectItem>
                    <SelectItem value="개">개</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stock Level Indicator */}
              <div className="space-y-2">
                <Label>재고 상태</Label>
                <div className="flex items-center gap-2">
                  {formData.currentStock <= formData.reorderPoint ? (
                    <>
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-red-600 font-medium">재주문 필요</span>
                    </>
                  ) : formData.currentStock >= formData.maxStock * 0.9 ? (
                    <>
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-yellow-600 font-medium">재고 과다</span>
                    </>
                  ) : (
                    <>
                      <div className="h-4 w-4 bg-green-500 rounded-full" />
                      <span className="text-green-600 font-medium">정상</span>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>가격 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost-price">원가</Label>
                  <Input
                    id="cost-price"
                    type="number"
                    value={formData.costPrice}
                    onChange={(e) => handleInputChange("costPrice", parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sell-price">판매가</Label>
                  <Input
                    id="sell-price"
                    type="number"
                    value={formData.sellPrice}
                    onChange={(e) => handleInputChange("sellPrice", parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label>마진율</Label>
                  <p className="text-lg font-semibold">
                    {((formData.sellPrice - formData.costPrice) / formData.sellPrice * 100).toFixed(1)}%
                  </p>
                </div>
                <div>
                  <Label>단위당 마진</Label>
                  <p className="text-lg font-semibold">
                    {(formData.sellPrice - formData.costPrice).toLocaleString()}원
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer Information */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                생성일: {formData.createdAt}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                수정일: {formData.updatedAt}
              </span>
            </div>
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              담당자: {formData.assignee}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}