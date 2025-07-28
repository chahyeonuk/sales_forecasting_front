import { Alert, AlertDescription } from "./ui/alert"
import { Badge } from "./ui/badge"
import { AlertTriangle, Package, TrendingDown, CheckCircle } from "lucide-react"

const issuesSummary = {
  outOfStock: 3,
  lowStock: 7,
  highReturn: 4,
  normal: 86
}

interface SKUIssuesSummaryProps {
  selectedSKU?: string;
}

export function SKUIssuesSummary({ selectedSKU }: SKUIssuesSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="flex items-center justify-between">
          <span>품절</span>
          <Badge variant="destructive">{issuesSummary.outOfStock}</Badge>
        </AlertDescription>
      </Alert>

      <Alert className="border-orange-200 bg-orange-50">
        <Package className="h-4 w-4 text-orange-600" />
        <AlertDescription className="flex items-center justify-between">
          <span>재고부족</span>
          <Badge variant="secondary" className="bg-orange-100 text-orange-800">
            {issuesSummary.lowStock}
          </Badge>
        </AlertDescription>
      </Alert>

      <Alert className="border-yellow-200 bg-yellow-50">
        <TrendingDown className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="flex items-center justify-between">
          <span>반품다량</span>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            {issuesSummary.highReturn}
          </Badge>
        </AlertDescription>
      </Alert>

      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="flex items-center justify-between">
          <span>정상</span>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {issuesSummary.normal}
          </Badge>
        </AlertDescription>
      </Alert>
    </div>
  )
}