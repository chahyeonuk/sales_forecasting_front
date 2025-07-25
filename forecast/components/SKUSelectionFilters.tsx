import { Search, Filter, Package } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Badge } from "./ui/badge"

interface SKUSelectionFiltersProps {
  selectedSKU: string
  onSKUChange: (value: string) => void
  dateRange: string
  onDateRangeChange: (value: string) => void
}

export function SKUSelectionFilters({ selectedSKU, onSKUChange, dateRange, onDateRangeChange }: SKUSelectionFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Search className="w-5 h-5" />
        <h3>SKU 선택 & 필터</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="SKU 검색..." 
            className="pl-10"
          />
        </div>

        <Select defaultValue="all-category">
          <SelectTrigger>
            <Package className="w-4 h-4" />
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-category">전체 카테고리</SelectItem>
            <SelectItem value="electronics">전자제품</SelectItem>
            <SelectItem value="clothing">의류</SelectItem>
            <SelectItem value="food">식품</SelectItem>
            <SelectItem value="cosmetics">화장품</SelectItem>
            <SelectItem value="household">생활용품</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all-status">
          <SelectTrigger>
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-status">전체 상태</SelectItem>
            <SelectItem value="normal">정상</SelectItem>
            <SelectItem value="low-stock">재고부족</SelectItem>
            <SelectItem value="out-of-stock">품절</SelectItem>
            <SelectItem value="high-return">반품 다량</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger>
            <SelectValue placeholder="예측 기간" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">3개월</SelectItem>
            <SelectItem value="6months">6개월</SelectItem>
            <SelectItem value="12months">12개월</SelectItem>
            <SelectItem value="24months">24개월</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">선택된 SKU:</span>
        <Badge variant="secondary">{selectedSKU} 스마트폰</Badge>
      </div>
    </div>
  )
}