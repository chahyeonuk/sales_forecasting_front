import { useState } from "react"
import { Upload, Database, CheckCircle, AlertTriangle, FileText, Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { FileUploadArea } from "../components/FileUploadArea"

export function UploadPage() {
  const [activeJobs, setActiveJobs] = useState([
    {
      id: "JOB-001",
      fileName: "tca_forecast_2024_07.xlsx",
      status: "processing",
      progress: 65,
      recordsProcessed: 850,
      totalRecords: 1300,
      startTime: "14:30",
      estimatedCompletion: "14:45"
    },
    {
      id: "JOB-002",
      fileName: "sku_inventory_update.csv",
      status: "validating",
      progress: 30,
      recordsProcessed: 456,
      totalRecords: 1520,
      startTime: "14:25",
      estimatedCompletion: "14:50"
    }
  ])

  const validationRules = [
    {
      name: "데이터 형식 검증",
      description: "필수 컬럼 및 데이터 타입 확인",
      enabled: true,
      status: "active"
    },
    {
      name: "중복 데이터 검사",
      description: "중복된 SKU 또는 TCA 코드 확인",
      enabled: true,
      status: "active"
    },
    {
      name: "범위 값 검증",
      description: "수량, 가격 등의 유효 범위 확인",
      enabled: true,
      status: "active"
    },
    {
      name: "참조 무결성",
      description: "마스터 데이터와의 연결성 확인",
      enabled: false,
      status: "inactive"
    }
  ]

  const dataMapping = [
    { source: "Product_Code", target: "SKU_Code", mapped: true },
    { source: "Product_Name", target: "SKU_Name", mapped: true },
    { source: "Forecast_Value", target: "Forecast_Amount", mapped: true },
    { source: "Category", target: "TCA_Category", mapped: false },
    { source: "Price", target: "Unit_Price", mapped: true }
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case 'processing':
        return <Badge className="bg-blue-100 text-blue-800">처리중</Badge>
      case 'validating':
        return <Badge className="bg-yellow-100 text-yellow-800">검증중</Badge>
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">완료</Badge>
      case 'failed':
        return <Badge variant="destructive">실패</Badge>
      default:
        return <Badge variant="outline">대기</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>데이터 업로드 센터</h1>
          <p className="text-muted-foreground">고급 파일 처리 및 데이터 검증 시스템</p>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          버전 3.0
        </Badge>
      </div>

      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="upload">파일 업로드</TabsTrigger>
          <TabsTrigger value="jobs">작업 모니터링</TabsTrigger>
          <TabsTrigger value="validation">검증 규칙</TabsTrigger>
          <TabsTrigger value="mapping">데이터 매핑</TabsTrigger>
          <TabsTrigger value="history">업로드 이력</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FileUploadArea />
            </div>
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    업로드 설정
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm">데이터 유형</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>TCA 예측 데이터</option>
                      <option>SKU 재고 데이터</option>
                      <option>판매 실적 데이터</option>
                      <option>마스터 데이터</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">처리 모드</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>신규 추가</option>
                      <option>기존 데이터 업데이트</option>
                      <option>전체 교체</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm">검증 수준</label>
                    <select className="w-full p-2 border rounded-md">
                      <option>엄격한 검증</option>
                      <option>표준 검증</option>
                      <option>기본 검증</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  실행 중인 작업
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeJobs.map((job) => (
                  <div key={job.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{job.fileName}</p>
                        <p className="text-sm text-muted-foreground">Job ID: {job.id}</p>
                      </div>
                      {getStatusBadge(job.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>진행률</span>
                        <span>{job.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${job.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">처리된 레코드</span>
                        <p>{job.recordsProcessed.toLocaleString()} / {job.totalRecords.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">예상 완료</span>
                        <p>{job.estimatedCompletion}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  시스템 상태
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">데이터베이스 연결</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">정상</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">업로드 큐</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">2개 대기</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm">검증 엔진</span>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">처리 중</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                데이터 검증 규칙
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {validationRules.map((rule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{rule.name}</p>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={rule.status === 'active' ? 'default' : 'outline'}
                        className={rule.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {rule.status === 'active' ? '활성' : '비활성'}
                      </Badge>
                      <Button variant="outline" size="sm">설정</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                컬럼 매핑 설정
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 p-3 bg-muted rounded-lg">
                  <span>소스 컬럼</span>
                  <span>대상 컬럼</span>
                  <span className="text-center">상태</span>
                </div>
                {dataMapping.map((mapping, index) => (
                  <div key={index} className="grid grid-cols-3 gap-4 p-3 border rounded-lg items-center">
                    <span className="font-mono text-sm">{mapping.source}</span>
                    <span className="font-mono text-sm">{mapping.target}</span>
                    <div className="text-center">
                      {mapping.mapped ? (
                        <Badge className="bg-green-100 text-green-800">매핑됨</Badge>
                      ) : (
                        <Badge variant="outline">미매핑</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                업로드 이력
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    fileName: "tca_forecast_2024_07.xlsx",
                    uploadDate: "2024-07-25 14:30",
                    status: "completed",
                    records: 1250,
                    errors: 0
                  },
                  {
                    fileName: "sku_inventory_2024_07.csv",
                    uploadDate: "2024-07-24 09:15",
                    status: "completed",
                    records: 3456,
                    errors: 12
                  },
                  {
                    fileName: "sales_data_Q2_2024.xlsx",
                    uploadDate: "2024-07-23 16:45",
                    status: "failed",
                    records: 0,
                    errors: 1
                  }
                ].map((history, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{history.fileName}</p>
                      <p className="text-sm text-muted-foreground">{history.uploadDate}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-right">
                        <p>레코드: {history.records.toLocaleString()}개</p>
                        {history.errors > 0 && (
                          <p className="text-destructive">오류: {history.errors}개</p>
                        )}
                      </div>
                      {getStatusBadge(history.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}