import { useState } from "react"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent } from "./ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Calendar } from "./ui/calendar"
import { Badge } from "./ui/badge"
import { CalendarIcon, Filter, RotateCcw } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

export function DashboardFilters() {
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date(2024, 11, 31)
  })
  const [selectedTCA, setSelectedTCA] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("12M")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const tcaOptions = [
    { value: "all", label: "전체 TCA" },
    { value: "TCA-001", label: "심혈관계" },
    { value: "TCA-002", label: "소화기계" },
    { value: "TCA-003", label: "호흡기계" },
    { value: "TCA-004", label: "신경계" },
    { value: "TCA-005", label: "내분비계" }
  ]

  const periodOptions = [
    { value: "1M", label: "1개월" },
    { value: "3M", label: "3개월" },
    { value: "6M", label: "6개월" },
    { value: "12M", label: "12개월" },
    { value: "24M", label: "24개월" }
  ]

  const resetFilters = () => {
    setSelectedTCA("all")
    setSelectedPeriod("12M")
    setDateRange({
      from: new Date(2024, 0, 1),
      to: new Date(2024, 11, 31)
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedTCA !== "all") count++
    if (selectedPeriod !== "12M") count++
    return count
  }

  return (
    <div className="flex items-center gap-4">
      {/* TCA Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">TCA:</span>
        <Select value={selectedTCA} onValueChange={setSelectedTCA}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tcaOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Period Filter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">기간:</span>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {periodOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date Range Picker */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">날짜:</span>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-60 justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "yyyy.MM.dd", { locale: ko })} -{" "}
                    {format(dateRange.to, "yyyy.MM.dd", { locale: ko })}
                  </>
                ) : (
                  format(dateRange.from, "yyyy.MM.dd", { locale: ko })
                )
              ) : (
                <span>날짜를 선택하세요</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Filter Actions */}
      <div className="flex items-center gap-2">
        <Button size="sm">
          <Filter className="w-4 h-4 mr-2" />
          적용
          {getActiveFiltersCount() > 0 && (
            <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 text-xs">
              {getActiveFiltersCount()}
            </Badge>
          )}
        </Button>
        
        {getActiveFiltersCount() > 0 && (
          <Button variant="outline" size="sm" onClick={resetFilters}>
            <RotateCcw className="w-4 h-4 mr-2" />
            초기화
          </Button>
        )}
      </div>
    </div>
  )
}