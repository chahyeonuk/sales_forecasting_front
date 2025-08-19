import { useState, useEffect } from "react"
import { Edit3, Save, X, Calendar, User, Package, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"



export function IssueDetailPanel({ issue, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedIssue, setEditedIssue] = useState(issue)

  // Update editedIssue when issue prop changes
  useEffect(() => {
    setEditedIssue(issue)
    setIsEditing(false)
  }, [issue])

  const handleSave = () => {
    onUpdate(editedIssue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedIssue(issue)
    setIsEditing(false)
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

  if (!issue) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4" />
            <p>이슈를 선택하여 상세 정보를 확인하세요</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Ensure editedIssue is not null before rendering form
  if (!editedIssue) {
    return (
      <Card className="h-full">
        <CardContent className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <p>로딩 중...</p>
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
            <AlertTriangle className="w-5 h-5" />
            상세/편집 패널
          </CardTitle>
          <div className="flex gap-2">
            {!isEditing ? (
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
      <CardContent className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4>기본 정보</h4>
            {getPriorityBadge(editedIssue.priority)}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>이슈 ID</Label>
              <Input value={editedIssue.id || ''} disabled className="mt-1" />
            </div>
            <div>
              <Label>SKU</Label>
              <Input value={editedIssue.sku || ''} disabled className="mt-1" />
            </div>
          </div>

          <div>
            <Label>제목</Label>
            {isEditing ? (
              <Input 
                value={editedIssue.title || ''}
                onChange={(e) => setEditedIssue({...editedIssue, title: e.target.value})}
                className="mt-1"
              />
            ) : (
              <Input value={editedIssue.title || ''} disabled className="mt-1" />
            )}
          </div>

          <div>
            <Label>설명</Label>
            {isEditing ? (
              <Textarea 
                value={editedIssue.description || ''}
                onChange={(e) => setEditedIssue({...editedIssue, description: e.target.value})}
                className="mt-1"
                rows={3}
              />
            ) : (
              <Textarea value={editedIssue.description || ''} disabled className="mt-1" rows={3} />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>이슈 유형</Label>
              {isEditing ? (
                <Select value={editedIssue.type || ''} onValueChange={(value) => setEditedIssue({...editedIssue, type: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="out_of_stock">품절</SelectItem>
                    <SelectItem value="low_stock">재고부족</SelectItem>
                    <SelectItem value="high_returns">반품다량</SelectItem>
                    <SelectItem value="quality_issue">품질이슈</SelectItem>
                    <SelectItem value="expiry_warning">유통기한</SelectItem>
                    <SelectItem value="supplier_delay">공급지연</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input value={getIssueTypeName(editedIssue.type || '')} disabled className="mt-1" />
              )}
            </div>
            <div>
              <Label>우선순위</Label>
              {isEditing ? (
                <Select value={editedIssue.priority || ''} onValueChange={(value) => setEditedIssue({...editedIssue, priority: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">긴급</SelectItem>
                    <SelectItem value="medium">보통</SelectItem>
                    <SelectItem value="low">낮음</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Input value={editedIssue.priority === 'high' ? '긴급' : editedIssue.priority === 'medium' ? '보통' : '낮음'} disabled className="mt-1" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>담당자</Label>
              {isEditing ? (
                <Input 
                  value={editedIssue.assignee || ''}
                  onChange={(e) => setEditedIssue({...editedIssue, assignee: e.target.value})}
                  className="mt-1"
                />
              ) : (
                <Input value={editedIssue.assignee || ''} disabled className="mt-1" />
              )}
            </div>
            <div>
              <Label>영향 수량</Label>
              {isEditing ? (
                <Input 
                  type="number"
                  value={editedIssue.affectedQuantity || 0}
                  onChange={(e) => setEditedIssue({...editedIssue, affectedQuantity: parseInt(e.target.value) || 0})}
                  className="mt-1"
                />
              ) : (
                <Input value={`${editedIssue.affectedQuantity || 0}개`} disabled className="mt-1" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>생성일</Label>
              <Input value={editedIssue.createdDate || ''} disabled className="mt-1" />
            </div>
            <div>
              <Label>예상 해결일</Label>
              {isEditing ? (
                <Input 
                  type="date"
                  value={editedIssue.expectedRestock || ''}
                  onChange={(e) => setEditedIssue({...editedIssue, expectedRestock: e.target.value})}
                  className="mt-1"
                />
              ) : (
                <Input value={editedIssue.expectedRestock || '미정'} disabled className="mt-1" />
              )}
            </div>
          </div>
        </div>

        {/* Action History */}
        <div className="space-y-2">
          <h4>처리 이력</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            <div className="text-sm p-2 bg-muted rounded">
              <div className="flex justify-between items-center">
                <span>이슈 생성</span>
                <span className="text-muted-foreground">{editedIssue.createdDate}</span>
              </div>
            </div>
            <div className="text-sm p-2 bg-muted rounded">
              <div className="flex justify-between items-center">
                <span>담당자 배정: {editedIssue.assignee}</span>
                <span className="text-muted-foreground">{editedIssue.createdDate}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}