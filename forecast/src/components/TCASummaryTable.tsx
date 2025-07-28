import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"

// Mock data for TCA sales and inventory summary
const summaryData = [
  {
    tca: "TCA-001",
    name: "전자제품 A",
    sales: 1250000,
    inventory: 150,
    forecast: 1380000,
    variance: "+10.4%"
  },
  {
    tca: "TCA-002", 
    name: "생활용품 B",
    sales: 890000,
    inventory: 89,
    forecast: 825000,
    variance: "-7.3%"
  },
  {
    tca: "TCA-003",
    name: "의류 C",
    sales: 2100000,
    inventory: 245,
    forecast: 2250000,
    variance: "+7.1%"
  },
  {
    tca: "TCA-004",
    name: "식품 D", 
    sales: 780000,
    inventory: 67,
    forecast: 810000,
    variance: "+3.8%"
  },
  {
    tca: "TCA-005",
    name: "화장품 E",
    sales: 1680000,
    inventory: 198,
    forecast: 1590000,
    variance: "-5.4%"
  }
]

interface TCASummaryTableProps {
  selectedTCA?: string
}

export function TCASummaryTable({ selectedTCA }: TCASummaryTableProps) {
  return (
    <div className="w-full">
      <h3 className="mb-4">TCA별 매출·재고 요약 테이블</h3>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TCA</TableHead>
              <TableHead>제품명</TableHead>
              <TableHead className="text-right">매출</TableHead>
              <TableHead className="text-right">재고</TableHead>
              <TableHead className="text-right">예측</TableHead>
              <TableHead className="text-right">증감율</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summaryData.map((item) => (
              <TableRow key={item.tca}>
                <TableCell>{item.tca}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('ko-KR').format(item.sales)}원
                </TableCell>
                <TableCell className="text-right">{item.inventory}개</TableCell>
                <TableCell className="text-right">
                  {new Intl.NumberFormat('ko-KR').format(item.forecast)}원
                </TableCell>
                <TableCell className={`text-right ${
                  item.variance.startsWith('+') ? 'text-green-600' : 'text-red-600'
                }`}>
                  {item.variance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}