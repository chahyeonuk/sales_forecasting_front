import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { ArrowUpIcon, ArrowDownIcon, MinusIcon, Download, Filter } from "lucide-react"

const tcaSummaryData = [
  {
    tca: "TCA-001",
    name: "심혈관계",
    currentStock: 45200,
    forecast3M: 52000,
    forecast6M: 98500,
    forecast12M: 185300,
    status: "정상",
    accuracy: 94.5,
    trend: "up",
    change: 8.2
  },
  {
    tca: "TCA-002", 
    name: "소화기계",
    currentStock: 23150,
    forecast3M: 28400,
    forecast6M: 54200,
    forecast12M: 102800,
    status: "주의",
    accuracy: 87.2,
    trend: "up",
    change: 3.1
  },
  {
    tca: "TCA-003",
    name: "호흡기계",
    currentStock: 12800,
    forecast3M: 15200,
    forecast6M: 29600,
    forecast12M: 56100,
    status: "위험",
    accuracy: 76.8,
    trend: "down",
    change: -12.5
  },
  {
    tca: "TCA-004",
    name: "신경계",
    currentStock: 67400,
    forecast3M: 72100,
    forecast6M: 134800,
    forecast12M: 248500,
    status: "정상",
    accuracy: 92.1,
    trend: "up",
    change: 5.7
  },
  {
    tca: "TCA-005",
    name: "내분비계",
    currentStock: 34500,
    forecast3M: 38200,
    forecast6M: 71800,
    forecast12M: 132400,
    status: "정상",
    accuracy: 89.6,
    trend: "stable",
    change: 0.8
  },
  {
    tca: "TCA-006",
    name: "근골격계",
    currentStock: 19300,
    forecast3M: 22800,
    forecast6M: 43200,
    forecast12M: 81600,
    status: "주의",
    accuracy: 83.4,
    trend: "down",
    change: -6.2
  },
  {
    tca: "TCA-007",
    name: "비뇨기계",
    currentStock: 28900,
    forecast3M: 31400,
    forecast6M: 59700,
    forecast12M: 115200,
    status: "정상",
    accuracy: 91.3,
    trend: "up",
    change: 4.3
  },
  {
    tca: "TCA-008",
    name: "안과",
    currentStock: 15600,
    forecast3M: 17200,
    forecast6M: 32800,
    forecast12M: 62400,
    status: "정상",
    accuracy: 88.9,
    trend: "stable",
    change: 1.2
  }
]

export function TCASummaryTable() {
  const getStatusBadge = (status) => {
    switch (status) {
      case "정상":
        return <Badge variant="default" className="bg-green-100 text-green-800">정상</Badge>
      case "주의":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">주의</Badge>
      case "위험":
        return <Badge variant="destructive" className="bg-red-100 text-red-800">위험</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <ArrowUpIcon className="h-4 w-4 text-green-600" />
      case "down":
        return <ArrowDownIcon className="h-4 w-4 text-red-600" />
      case "stable":
        return <MinusIcon className="h-4 w-4 text-gray-600" />
      default:
        return <MinusIcon className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (change) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 90) return "text-green-600"
    if (accuracy >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>TCA별 예측 요약</CardTitle>
            <CardDescription>치료군별 현재 재고 및 예측 현황</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              필터
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              내보내기
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">TCA</TableHead>
                <TableHead>치료군명</TableHead>
                <TableHead className="text-right">현재 재고</TableHead>
                <TableHead className="text-right">3개월 예측</TableHead>
                <TableHead className="text-right">6개월 예측</TableHead>
                <TableHead className="text-right">12개월 예측</TableHead>
                <TableHead className="text-center">정확도</TableHead>
                <TableHead className="text-center">트렌드</TableHead>
                <TableHead className="text-center">상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tcaSummaryData.map((item) => (
                <TableRow key={item.tca} className="hover:bg-muted/50">
                  <TableCell className="font-mono font-medium">
                    {item.tca}
                  </TableCell>
                  <TableCell className="font-medium">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {item.currentStock.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {item.forecast3M.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {item.forecast6M.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-mono">
                    {item.forecast12M.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-semibold ${getAccuracyColor(item.accuracy)}`}>
                      {item.accuracy}%
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      {getTrendIcon(item.trend)}
                      <span className={`text-sm font-medium ${getTrendColor(item.change)}`}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(item.status)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">전체 TCA</p>
            <p className="text-lg font-semibold">{tcaSummaryData.length}개</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">평균 정확도</p>
            <p className="text-lg font-semibold">
              {(tcaSummaryData.reduce((sum, item) => sum + item.accuracy, 0) / tcaSummaryData.length).toFixed(1)}%
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">정상 상태</p>
            <p className="text-lg font-semibold text-green-600">
              {tcaSummaryData.filter(item => item.status === '정상').length}개
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">주의/위험</p>
            <p className="text-lg font-semibold text-red-600">
              {tcaSummaryData.filter(item => item.status !== '정상').length}개
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}