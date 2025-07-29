import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Badge } from "./ui/badge"
import { Calendar, Filter, X, Search } from "lucide-react"

export function SKUSelectionFilters() {
  const [filters, setFilters] = useState({
    sku: "",
    tca: "all",
    status: "all",
    accuracy: "all",
    dateRange: "1M"
  })

  const [activeFilters, setActiveFilters] = useState([])

  const tcaOptions = [
    { value: "all", label: "전체 TCA" },
    { value: "TCA-001", label: "심혈관계" },
    { value: "TCA-002", label: "소화기계" },
    { value: "TCA-003", label: "호흡기계" },
    { value: "TCA-004", label: "신경계" },
    { value: "TCA-005", label: "내분비계" }
  ]

  const statusOptions = [
    { value: "all", label: "전체 상태" },
    { value: "normal", label: "정상" },
    { value: "warning", label: "주의" },
    { value: "critical", label: "위험" }
  ]

  const accuracyOptions = [
    { value: "all", label: "전체 정확도" },
    { value: "high", label: "90% 이상" },
    { value: "medium", label: "80-90%" },
    { value: "low", label: "80% 미만" }
  ]

  const dateRangeOptions = [
    { value: "1M", label: "1개월" },
    { value: "3M", label: "3개월" },
    { value: "6M", label: "6개월" },
    { value: "12M", label: "12개월" }
  ]

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))

    // Update active filters
    if (value !== "all" && value !== "") {
      const filterLabel = getFilterLabel(key, value)
      setActiveFilters(prev => {
        const existing = prev.filter(f => f.key !== key)
        return [...existing, { key, value, label: filterLabel }]
      })
    } else {
      setActiveFilters(prev => prev.filter(f => f.key !== key))
    }
  }

  const getFilterLabel = (key, value) => {
    switch (key) {
      case "sku":
        return `SKU: ${value}`
      case "tca":
        return `TCA: ${tcaOptions.find(t => t.value === value)?.label}`
      case "status":
        return `상태: ${statusOptions.find(s => s.value === value)?.label}`
      case "accuracy":
        return `정확도: ${accuracyOptions.find(a => a.value === value)?.label}`
      case "dateRange":
        return `기간: ${dateRangeOptions.find(d => d.value === value)?.label}`
      default:
        return value
    }
  }

  const removeFilter = (key) => {
    setFilters(prev => ({
      ...prev,
      [key]: key === "sku" ? "" : "all"
    }))
    setActiveFilters(prev => prev.filter(f => f.key !== key))
  }

  const clearAllFilters = () => {
    setFilters({
      sku: "",
      tca: "all",
      status: "all",
      accuracy: "all",
      dateRange: "1M"
    })
    setActiveFilters([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SKU 선택 및 필터</CardTitle>
        <CardDescription>원하는 SKU를 검색하고 필터를 적용하세요</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="SKU 코드 또는 제품명 검색..."
            value={filters.sku}
            onChange={(e) => handleFilterChange("sku", e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">TCA 카테고리</label>
            <Select value={filters.tca} onValueChange={(value) => handleFilterChange("tca", value)}>
              <SelectTrigger>
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

          <div className="space-y-2">
            <label className="text-sm font-medium">상태</label>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">예측 정확도</label>
            <Select value={filters.accuracy} onValueChange={(value) => handleFilterChange("accuracy", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {accuracyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">분석 기간</label>
            <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">적용된 필터</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-auto p-1 text-xs"
              >
                전체 해제
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge
                  key={filter.key}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  <span>{filter.label}</span>
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeFilter(filter.key)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Button className="flex-1">
            <Filter className="w-4 h-4 mr-2" />
            필터 적용
          </Button>
          <Button variant="outline" className="flex-1">
            <Calendar className="w-4 h-4 mr-2" />
            기간 설정
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}