import { useState, useRef } from "react"
import { Upload, File, CheckCircle, AlertCircle, X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Progress } from "./ui/progress"
import { Badge } from "./ui/badge"

// Mock upload data
const mockUploadHistory = [
  {
    id: "UP-001",
    fileName: "TCA_forecast_data_2024_07.xlsx",
    uploadDate: "2024-07-25 14:30",
    status: "completed",
    recordCount: 1250,
    errors: 0
  },
  {
    id: "UP-002", 
    fileName: "SKU_inventory_2024_07.csv",
    uploadDate: "2024-07-24 09:15",
    status: "completed",
    recordCount: 3456,
    errors: 12
  },
  {
    id: "UP-003",
    fileName: "sales_data_Q2_2024.xlsx",
    uploadDate: "2024-07-23 16:45",
    status: "failed",
    recordCount: 0,
    errors: 1
  }
]

export function FileUploadArea() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleUpload = () => {
    if (!selectedFile) return
    
    setUploading(true)
    setUploadProgress(0)
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploading(false)
          setSelectedFile(null)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">완료</Badge>
      case 'failed':
        return <Badge variant="destructive">실패</Badge>
      case 'processing':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">처리중</Badge>
      default:
        return <Badge variant="outline">알 수 없음</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* File Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            파일 업로드
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="mb-2">파일을 여기에 드래그하거나 클릭하여 선택하세요</p>
            <p className="text-sm text-muted-foreground mb-4">
              지원 형식: .xlsx, .csv, .json (최대 10MB)
            </p>
            <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
              파일 선택
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".xlsx,.csv,.json"
              onChange={handleFileSelect}
            />
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5" />
                <div>
                  <p>{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={handleUpload} disabled={uploading}>
                  업로드
                </Button>
                <Button size="sm" variant="outline" onClick={handleRemoveFile}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>업로드 진행중...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upload History */}
      <Card>
        <CardHeader>
          <CardTitle>업로드 이력</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockUploadHistory.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="w-4 h-4" />
                  <div>
                    <p>{upload.fileName}</p>
                    <p className="text-sm text-muted-foreground">{upload.uploadDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-right">
                    <p>레코드: {upload.recordCount.toLocaleString()}개</p>
                    {upload.errors > 0 && (
                      <p className="text-destructive">오류: {upload.errors}개</p>
                    )}
                  </div>
                  {getStatusBadge(upload.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}