import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import { AlertTriangle, TrendingDown, Package } from "lucide-react"

// Mock data for SKU actual vs forecast comparison
const comparisonData = [
	{
		sku: "SKU-A001",
		name: "갤럭시 스마트폰",
		category: "전자제품",
		actual_qty: 250,
		forecast_qty: 240,
		actual_krw: 2500000,
		forecast_krw: 2400000,
		variance_qty: "+4.2%",
		variance_krw: "+4.2%",
		issues: ["정상"],
	},
	{
		sku: "SKU-B203",
		name: "데님 청바지",
		category: "의류",
		actual_qty: 89,
		forecast_qty: 120,
		actual_krw: 890000,
		forecast_krw: 1200000,
		variance_qty: "-25.8%",
		variance_krw: "-25.8%",
		issues: ["재고부족"],
	},
	{
		sku: "SKU-C105",
		name: "신라면 컵라면",
		category: "식품",
		actual_qty: 0,
		forecast_qty: 200,
		actual_krw: 0,
		forecast_krw: 200000,
		variance_qty: "-100%",
		variance_krw: "-100%",
		issues: ["품절"],
	},
	{
		sku: "SKU-D078",
		name: "화이트닝 크림",
		category: "화장품",
		actual_qty: 145,
		forecast_qty: 150,
		actual_krw: 1450000,
		forecast_krw: 1500000,
		variance_qty: "-3.3%",
		variance_krw: "-3.3%",
		issues: ["반품다량"],
	},
	{
		sku: "SKU-E234",
		name: "무선 이어폰",
		category: "전자제품",
		actual_qty: 320,
		forecast_qty: 280,
		actual_krw: 3200000,
		forecast_krw: 2800000,
		variance_qty: "+14.3%",
		variance_krw: "+14.3%",
		issues: ["정상"],
	},
]

function getIssueBadge(issue) {
	switch (issue) {
		case "품절":
			return (
				<Badge variant="destructive" className="flex items-center gap-1">
					<AlertTriangle className="w-3 h-3" />
					품절
				</Badge>
			)
		case "재고부족":
			return (
				<Badge variant="secondary" className="flex items-center gap-1 bg-orange-100 text-orange-800">
					<Package className="w-3 h-3" />
					재고부족
				</Badge>
			)
		case "반품다량":
			return (
				<Badge variant="secondary" className="flex items-center gap-1 bg-yellow-100 text-yellow-800">
					<TrendingDown className="w-3 h-3" />
					반품다량
				</Badge>
			)
		default:
			return (
				<Badge variant="secondary" className="bg-green-100 text-green-800">
					정상
				</Badge>
			)
	}
}



export function SKUActualVsForecastTable({ selectedSKU }) {
	return (
		<div className="w-full">
			<h3 className="mb-4">실제 vs 예측 테이블</h3>
			<div className="border rounded-lg">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>SKU</TableHead>
							<TableHead>제품명</TableHead>
							<TableHead>카테고리</TableHead>
							<TableHead className="text-right">실제 수량</TableHead>
							<TableHead className="text-right">예측 수량</TableHead>
							<TableHead className="text-right">실제 매출</TableHead>
							<TableHead className="text-right">예측 매출</TableHead>
							<TableHead className="text-right">수량 차이</TableHead>
							<TableHead className="text-center">이슈</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{comparisonData
							// 필요시 selectedSKU로 필터링
							// .filter(item => !selectedSKU || item.sku === selectedSKU)
							.map((item) => (
								<TableRow key={item.sku}>
									<TableCell>{item.sku}</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.category}</TableCell>
									<TableCell className="text-right">{item.actual_qty}개</TableCell>
									<TableCell className="text-right">{item.forecast_qty}개</TableCell>
									<TableCell className="text-right">
										{new Intl.NumberFormat("ko-KR").format(item.actual_krw)}원
									</TableCell>
									<TableCell className="text-right">
										{new Intl.NumberFormat("ko-KR").format(item.forecast_krw)}원
									</TableCell>
									<TableCell
										className={`text-right ${
											item.variance_qty.startsWith("+") ? "text-green-600" : "text-red-600"
										}`}
									>
										{item.variance_qty}
									</TableCell>
									<TableCell className="text-center">
										<div className="flex flex-wrap gap-1 justify-center">
											{item.issues.map((issue, index) => (
												<div key={index}>{getIssueBadge(issue)}</div>
											))}
										</div>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}