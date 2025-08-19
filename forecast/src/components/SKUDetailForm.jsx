import { useState, useEffect } from "react"
import { Edit3, Save, X, Package, User, Building, Calendar, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Switch } from "./ui/switch"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"

export function SKUDetailForm({ sku, onSave, onCancel, isNew = false }) {
  const [isEditing, setIsEditing] = useState(isNew)
  const [formData, setFormData] = useState(sku || {
    id: '',
    name: '',
    category: '',
    tca: '',
    inn: '',
    assignee: '',
    status: 'active',
    reorderPoint: 0,
    currentStock: 0,
    discontinued: false,
    description: '',
    supplier: '',
    unitPrice: 0,
    createdDate: new Date().toISOString().split('T')[0],
    lastModified: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    if (sku) {
      setFormData(sku)
      setIsEditing(isNew)
    }
  }, [sku, isNew])

  const handleSave = () => {
    const updatedSKU = {
      ...formData,
      lastModified: new Date().toISOString().split('T')[0]
    }
    onSave(updatedSKU)
    setIsEditing(false)
  }

  const handleCancel = () => {
    if (isNew && onCancel) {
      onCancel()
    } else {
      setFormData(sku)
      setIsEditing(false)
    }
  }

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (!sku && !isNew) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4" />
            <p>SKU를 선택하여 상세 정보를 확인하세요</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            {isNew ? '신규 SKU 등록' : 'SKU 상세폼'}
          </CardTitle>
          <div className="flex gap-2">
            {!isEditing && !isNew ? (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit3 className="w-4 h-4 mr-2" />
                편집
              </Button>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-2" />
                  취소
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  저장
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
        {/* Basic Information */}
        <div className="space-y-4">
          <h4>기본 정보</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>SKU ID</Label>
              <Input
                value={formData.id || ''}
                onChange={(e) => updateField('id', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
                placeholder="SKU-XXXX"
              />
            </div>
            <div>
              <Label>상품명</Label>
              <Input
                value={formData.name || ''}
                onChange={(e) => updateField('name', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
                placeholder="상품명을 입력하세요"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>카테고리</Label>
              {isEditing ? (
                <Select value={formData.category || ''} onValueChange={(value) => updateField('category', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="전자제품">전자제품</SelectItem>
                    <SelectItem value="의류">의류</SelectItem>
                    <SelectItem value="식품">식품</SelectItem>
                    <SelectItem value="화장품">화장품</SelectItem>
                    <SelectItem value="생활용품">생활용품</SelectItem>
                    <SelectItem value="기타">기타</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input value={formData.category || ''} disabled className="mt-1" />
              )}
            </div>
            <div>
              <Label>상태</Label>
              {isEditing ? (
                <Select value={formData.status || ''} onValueChange={(value) => updateField('status', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">활성</SelectItem>
                    <SelectItem value="low_stock">재고부족</SelectItem>
                    <SelectItem value="discontinued">단종</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input 
                  value={formData.status === 'active' ? '활성' : formData.status === 'low_stock' ? '재고부족' : '단종'} 
                  disabled 
                  className="mt-1" 
                />
              )}
            </div>
          </div>

          <div>
            <Label>상품 설명</Label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => updateField('description', e.target.value)}
              disabled={!isEditing}
              className="mt-1"
              rows={2}
              placeholder="상품 설명을 입력하세요"
            />
          </div>
        </div>

        <Separator />

        {/* TCA, INN, Assignee */}
        <div className="space-y-4">
          <h4>관리 정보</h4>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>TCA</Label>
              <Input
                value={formData.tca || ''}
                onChange={(e) => updateField('tca', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
                placeholder="TCA-XXX"
              />
            </div>
            <div>
              <Label>INN</Label>
              <Input
                value={formData.inn || ''}
                onChange={(e) => updateField('inn', e.target.value)}
                disabled={!isEditing}
                className="mt-1"
                placeholder="INN-XXX"
              />
            </div>
            <div>
              <Label>담당자</Label>
              {isEditing ? (
                <Select value={formData.assignee || ''} onValueChange={(value) => updateField('assignee', value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="담당자 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="김담당자">김담당자</SelectItem>
                    <SelectItem value="이관리자">이관리자</SelectItem>
                    <SelectItem value="박팀장">박팀장</SelectItem>
                    <SelectItem value="최분석가">최분석가</SelectItem>
                    <SelectItem value="정담당자">정담당자</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input value={formData.assignee || ''} disabled className="mt-1" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>공급업체</Label>
              {isEditing ? (
                <Select value={formData.supplier || ''} onValueChange={(value) => updateField('supplier', value)}>
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
              ) : (
                <Input value={formData.supplier || ''} disabled className="mt-1" />
              )}
            </div>
            <div>
              <Label>단가</Label>
              <Input
                type="number"
                value={formData.unitPrice || 0}
                onChange={(e) => updateField('unitPrice', parseInt(e.target.value) || 0)}
                disabled={!isEditing}
                className="mt-1"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Reorder Point & Discontinuation */}
        <div className="space-y-4">
          <h4>재주문점 · 단종 여부 설정</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>현재 재고</Label>
              <Input
                type="number"
                value={formData.currentStock || 0}
                onChange={(e) => updateField('currentStock', parseInt(e.target.value) || 0)}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <Label>재주문점</Label>
              <Input
                type="number"
                value={formData.reorderPoint || 0}
                onChange={(e) => updateField('reorderPoint', parseInt(e.target.value) || 0)}
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label>단종 여부</Label>
              <p className="text-sm text-muted-foreground">
                단종 처리 시 주문이 중단됩니다
              </p>
            </div>
            <Switch
              checked={formData.discontinued || false}
              onCheckedChange={(checked) => updateField('discontinued', checked)}
              disabled={!isEditing}
            />
          </div>

          {formData.discontinued && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm text-red-700">이 제품은 단종 처리되었습니다</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Timestamps */}
        <div className="space-y-4">
          <h4>이력 정보</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>생성일</Label>
              <Input value={formData.createdDate || ''} disabled className="mt-1" />
            </div>
            <div>
              <Label>최종 수정일</Label>
              <Input value={formData.lastModified || ''} disabled className="mt-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}