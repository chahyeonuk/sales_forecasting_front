import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Upload, FileText, X } from "lucide-react"

export function FileUploadArea({ onFileUpload }) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }

  const handleChange = (e) => {
    e.preventDefault()
    const files = Array.from(e.target.files)
    handleFiles(files)
  }

  const handleFiles = (files) => {
    const validFiles = files.filter(file => {
      const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'text/csv'
      ]
      return validTypes.includes(file.type) || 
             file.name.endsWith('.xlsx') || 
             file.name.endsWith('.xls') || 
             file.name.endsWith('.csv')
    })

    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => ({
        id: Date.now() + Math.random(),
        file: file,
        name: file.name,
        size: formatFileSize(file.size),
        status: 'ready'
      }))
      
      setUploadedFiles(prev => [...prev, ...newFiles])
      
      if (onFileUpload) {
        onFileUpload(validFiles)
      }
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId))
  }

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>파일 업로드</CardTitle>
        <CardDescription>
          Excel (.xlsx, .xls) 또는 CSV 파일을 업로드하세요.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".xlsx,.xls,.csv"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">
                파일을 드래그하거나 클릭하여 업로드
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                지원 형식: Excel (.xlsx, .xls), CSV (.csv)
              </p>
            </div>
            
            <Button onClick={onButtonClick} className="mt-4">
              <Upload className="w-4 h-4 mr-2" />
              파일 선택
            </Button>
          </div>
        </div>

        {/* File List */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">업로드된 파일</h4>
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{file.size}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                      준비완료
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Guidelines */}
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">업로드 가이드라인</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 최대 파일 크기: 50MB</li>
            <li>• 지원 형식: Excel (.xlsx, .xls), CSV (.csv)</li>
            <li>• 필수 컬럼: SKU_CODE, PRODUCT_NAME, QUANTITY, DATE</li>
            <li>• 날짜 형식: YYYY-MM-DD</li>
            <li>• 한 번에 최대 10개 파일 업로드 가능</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}