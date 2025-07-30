import { useState } from "react"
import { TCAForecastChart } from "../components/TCAForecastChart"
import { TCASummaryTable } from "../components/TCASummaryTable"
import { DashboardFilters } from "../components/DashboardFilters"

export function TCAForecastPage() {
  const [selectedTCA, setSelectedTCA] = useState("TCA-001")
  const [dateRange, setDateRange] = useState("24months")

  return (
    <div className="p-6 space-y-6">
      <h1>TCA 예측</h1>
      
      <DashboardFilters 
        selectedTCA={selectedTCA}
        onTCAChange={setSelectedTCA}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <TCAForecastChart selectedTCA={selectedTCA} dateRange={dateRange} />
        </div>
        <div className="xl:col-span-1">
          <TCASummaryTable selectedTCA={selectedTCA} />
        </div>
      </div>
    </div>
  )
}