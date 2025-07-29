import { useState } from "react"
import { FileUploadArea } from "../components/FileUploadArea" 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Progress } from "../components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { AlertCircle, CheckCircle, Clock, FileText, Upload, X } from "lucide-react"
import { Alert, AlertDescription } from "../components/ui/alert"

export function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "sales_data_2024.xlsx",
      size: "2.4 MB",
      status: "completed",
      uploadDate: "2024-01-15",
      records: 12547,
      validRecords: 12234,
      errorRecords: 313,
      progress: 100
    },
    {
      id: 2, 
      name: "inventory_data.csv",
      size: "1.8 MB", 
      status: "processing",
      uploadDate: "2024-01-15",
      records: 8945,
      validRecords: 8701,
      errorRecords: 244,
      progress: 75
    },
    {
      id: 3,
      name: "forecast_data.xlsx", 
      size: "3.2 MB",
      status: "failed",
      uploadDate: "2024-01-14",
      records: 0,
      validRecords: 0,
      errorRecords: 0,
      progress: 0,
      error: "파일 형식이 올바르지 않습니다"
    }
  ])

  const validationSummary = {
    totalFiles: uploadedFiles.length,
    completedFiles: uploadedFiles.filter(f => f.status === 'completed').length,
    processingFiles: uploadedFiles.filter(f => f.status === 'processing').length,
    failedFiles: uploadedFiles.filter(f => f.status === 'failed').length,
    totalRecords: uploadedFiles.reduce((sum, f) => sum + f.records, 0),
    validRecords: uploadedFiles.reduce((sum, f) => sum + f.validRecords, 0),
    errorRecords: uploadedFiles.reduce((sum, f) => sum + f.errorRecords, 0)
  }

  const commonErrors = [
    { type: "데이터 형식 오류", count: 156, description: "날짜 또는 숫자 형식이 잘못됨" },
    { type: "필수 필드 누락", count: 89, description: "SKU 코드 또는 수량 정보 없음" },
    { type: "중복 데이터", count: 68, description: "동일한 SKU의 중복 레코드" },
    { type: "범위 초과", count: 34, description: "허용 범위를 벗어난 값" }
  ]

  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map((file, index) => ({
      id: uploadedFiles.length + index + 1,
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      status: "processing",
      uploadDate: new Date().toISOString().split('T')[0],
      records: Math.floor(Math.random() * 10000) + 1000,
      validRecords: 0,
      errorRecords: 0,
      progress: 0
    }))
    
    setUploadedFiles([...uploadedFiles, ...newFiles])
    
    // Simulate processing
    newFiles.forEach((file, index) => {
      setTimeout(() => {
        setUploadedFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { 
                ...f, 
                status: "completed", 
                validRecords: Math.floor(f.records * 0.95),
                errorRecords: Math.floor(f.records * 0.05),
                progress: 100 
              }
            : f
        ))
      }, (index + 1) * 2000)
    })
  }

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'processing': return <Clock className="h-4 w-4 text-blue-600" />
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-600" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed': return <Badge variant="default">완료</Badge>
      case 'processing': return <Badge variant="secondary">처리중</Badge>
      case 'failed': return <Badge variant="destructive">실패</Badge>
      default: return <Badge variant="outline">대기</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">데이터 업로드 (Advanced)</h1>
          <p className="text-muted-foreground">
            Excel, CSV 파일 업로드 및 데이터 검증 시스템
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            템플릿 다운로드
          </Button>
          <Button>
            <Upload className="w-4 h-4 mr-2" />
            파일 업로드
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">전체 파일</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{validationSummary.totalFiles}</div>
            <p className="text-xs text-muted-foreground">업로드된 파일 수</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">총 레코드</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{validationSummary.totalRecords.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">처리된 데이터 행</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">유효 레코드</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {validationSummary.validRecords.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">검증 통과 데이터</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">  
            <CardTitle className="text-sm font-medium">오류 레코드</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {validationSummary.errorRecords.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">검증 실패 데이터</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="upload" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upload">파일 업로드</TabsTrigger>
          <TabsTrigger value="validation">검증 결과</TabsTrigger>
          <TabsTrigger value="history">업로드 히스토리</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <FileUploadArea onFileUpload={handleFileUpload} />
            
            <Card>
              <CardHeader>
                <CardTitle>업로드 가이드</CardTitle>
                <CardDescription>파일 업로드 시 주의사항</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    지원 형식: Excel(.xlsx, .xls), CSV(.csv) 파일만 업로드 가능합니다.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">필수 컬럼</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• SKU 코드 (SKU_CODE)</li>
                    <li>• 제품명 (PRODUCT_NAME)</li>
                    <li>• 수량 (QUANTITY)</li>
                    <li>• 날짜 (DATE)</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">데이터 형식</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 날짜: YYYY-MM-DD 형식</li>
                    <li>• 수량: 숫자만 입력</li>
                    <li>• SKU 코드: 영문/숫자 조합</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>업로드된 파일 목록</CardTitle>
                <CardDescription>파일별 처리 상태 및 검증 결과</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(file.status)}
                          <div>
                            <p className="font-semibold text-sm">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {file.size} • {file.uploadDate}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(file.status)}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {file.status === 'processing' && (
                        <Progress value={file.progress} className="h-2" />
                      )}
                      
                      {file.status === 'completed' && (
                        <div className="grid grid-cols-3 gap-4 text-xs">
                          <div>
                            <p className="text-muted-foreground">총 레코드</p>
                            <p className="font-semibold">{file.records.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">유효</p>
                            <p className="font-semibold text-green-600">
                              {file.validRecords.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">오류</p>
                            <p className="font-semibold text-red-600">
                              {file.errorRecords.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {file.status === 'failed' && (
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription className="text-sm">
                            {file.error}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>주요 오류 유형</CardTitle>
                <CardDescription>데이터 검증 중 발견된 오류들</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commonErrors.map((error, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{error.type}</h4>
                        <Badge variant="outline">{error.count}건</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {error.description}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex gap-2">
                  <Button className="flex-1">
                    데이터 적용
                  </Button>
                  <Button variant="outline" className="flex-1">
                    오류 다운로드
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>업로드 히스토리</CardTitle>
              <CardDescription>최근 30일간 업로드 이력</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>업로드 히스토리가 없습니다.</p>
                <p className="text-sm">파일을 업로드하면 여기에 기록됩니다.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}