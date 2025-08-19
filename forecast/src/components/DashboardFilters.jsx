import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { CalendarDays, Filter } from "lucide-react"


export function DashboardFilters({ selectedTCA, onTCAChange, dateRange, onDateRangeChange }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex items-center gap-2">
        <Filter className="w-4 h-4" />
        <span>Filters:</span>
      </div>
      
      <Select value={selectedTCA} onValueChange={onTCAChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="TCA 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체 TCA</SelectItem>
          <SelectItem value="TCA-001">TCA-001 (전자제품 A)</SelectItem>
          <SelectItem value="TCA-002">TCA-002 (생활용품 B)</SelectItem>
          <SelectItem value="TCA-003">TCA-003 (의류 C)</SelectItem>
          <SelectItem value="TCA-004">TCA-004 (식품 D)</SelectItem>
          <SelectItem value="TCA-005">TCA-005 (화장품 E)</SelectItem>
        </SelectContent>
      </Select>

      <Select value={dateRange} onValueChange={onDateRangeChange}>
        <SelectTrigger className="w-48">
          <CalendarDays className="w-4 h-4" />
          <SelectValue placeholder="기간 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="6months">최근 6개월</SelectItem>
          <SelectItem value="12months">최근 12개월</SelectItem>
          <SelectItem value="24months">24개월 예측</SelectItem>
          <SelectItem value="custom">사용자 지정</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}