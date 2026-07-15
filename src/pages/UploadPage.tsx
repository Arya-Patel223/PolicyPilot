import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Upload, FileText, CheckCircle2, X, RefreshCw, Clock,
  CloudUpload, File, FileImage, AlertCircle,
} from "lucide-react"

interface UploadFile {
  id: number
  name: string
  size: string
  type: string
  status: "uploading" | "processing" | "complete" | "error"
  progress: number
}

const acceptedTypes = ["PDF", "DOCX", "TXT", "CSV", "XLSX"]

const recentUploads: UploadFile[] = [
  { id: 1, name: "GDPR_Policy_v2.1.pdf", size: "142 KB", type: "PDF", status: "complete", progress: 100 },
  { id: 2, name: "Employee_Handbook_2025.docx", size: "2.4 MB", type: "DOCX", status: "complete", progress: 100 },
  { id: 3, name: "SOC2_Audit_Report_Q1.pdf", size: "890 KB", type: "PDF", status: "complete", progress: 100 },
  { id: 4, name: "Vendor_Agreements.xlsx", size: "345 KB", type: "XLSX", status: "error", progress: 0 },
]

export function UploadPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploads, setUploads] = useState<UploadFile[]>([])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }
  const handleDragLeave = () => setIsDragging(false)

  const simulateUpload = (fileName: string, fileSize: string) => {
    const id = Date.now()
    const newFile: UploadFile = {
      id,
      name: fileName,
      size: fileSize,
      type: fileName.split(".").pop()?.toUpperCase() ?? "FILE",
      status: "uploading",
      progress: 0,
    }
    setUploads((prev) => [newFile, ...prev])

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 25
      if (progress >= 100) {
        clearInterval(interval)
        setUploads((prev) =>
          prev.map((f) => f.id === id ? { ...f, progress: 100, status: "processing" } : f)
        )
        setTimeout(() => {
          setUploads((prev) =>
            prev.map((f) => f.id === id ? { ...f, status: "complete" } : f)
          )
        }, 1200)
      } else {
        setUploads((prev) =>
          prev.map((f) => f.id === id ? { ...f, progress: Math.min(progress, 95) } : f)
        )
      }
    }, 200)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    files.forEach((file) => {
      simulateUpload(file.name, `${(file.size / 1024).toFixed(0)} KB`)
    })
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    files.forEach((file) => {
      simulateUpload(file.name, `${(file.size / 1024).toFixed(0)} KB`)
    })
    e.target.value = ""
  }

  const removeUpload = (id: number) => {
    setUploads((prev) => prev.filter((f) => f.id !== id))
  }

  const getTypeIcon = (type: string) => {
    if (type === "PDF") return <FileText className="size-4 text-destructive" />
    if (["DOCX", "DOC"].includes(type)) return <File className="size-4 text-primary" />
    if (["XLSX", "CSV"].includes(type)) return <FileImage className="size-4 text-success" />
    return <File className="size-4 text-muted-foreground" />
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-[900px] mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Upload Policies</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Upload documents to analyze with AI and track compliance</p>
      </div>

      {/* Upload dropzone */}
      <Card className="shadow-none border border-border overflow-hidden">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center py-16 px-8 cursor-pointer transition-all duration-200 ${
            isDragging
              ? "bg-primary/5 border-2 border-primary border-dashed"
              : "bg-muted/20 hover:bg-muted/40 border-2 border-border border-dashed"
          }`}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,.docx,.doc,.txt,.csv,.xlsx"
            className="hidden"
            onChange={handleFileInput}
          />

          <div className={`flex size-16 items-center justify-center rounded-2xl mb-5 transition-all ${
            isDragging ? "bg-primary/15 scale-110" : "bg-muted"
          }`}>
            <CloudUpload className={`size-8 transition-colors ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
          </div>

          <h3 className="text-base font-semibold mb-1.5">
            {isDragging ? "Drop files here" : "Drag & drop files here"}
          </h3>
          <p className="text-sm text-muted-foreground mb-5">
            or <span className="text-primary font-medium">browse to upload</span>
          </p>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {acceptedTypes.map((t) => (
              <Badge key={t} variant="outline" className="text-xs font-mono">{t}</Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">Maximum file size: 50 MB per file</p>
        </div>
      </Card>

      {/* Processing uploads */}
      {uploads.length > 0 && (
        <Card className="shadow-none border border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">Uploading ({uploads.length})</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {uploads.map((file) => (
              <div key={file.id} className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted shrink-0">
                  {getTypeIcon(file.type)}
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-2 shrink-0">
                      {file.status === "complete" && (
                        <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20 gap-1">
                          <CheckCircle2 className="size-3" />Done
                        </Badge>
                      )}
                      {file.status === "processing" && (
                        <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20 gap-1">
                          <Clock className="size-3 animate-spin" />Analyzing
                        </Badge>
                      )}
                      {file.status === "uploading" && (
                        <span className="text-xs text-muted-foreground">{Math.round(file.progress)}%</span>
                      )}
                      <Button variant="ghost" size="icon" className="size-6" onClick={() => removeUpload(file.id)}>
                        <X className="size-3" />
                      </Button>
                    </div>
                  </div>
                  {file.status !== "complete" && (
                    <Progress value={file.progress} className="h-1" />
                  )}
                  <p className="text-xs text-muted-foreground">{file.size} · {file.type}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Upload history */}
      <Card className="shadow-none border border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-semibold">Recent Uploads</CardTitle>
              <CardDescription className="text-xs mt-0.5">Previously uploaded documents</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col">
            {recentUploads.map((file, i) => (
              <div key={file.id}>
                {i > 0 && <Separator />}
                <div className="flex items-center gap-3 px-6 py-3 hover:bg-muted/30 transition-colors">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-muted shrink-0">
                    {getTypeIcon(file.type)}
                  </div>
                  <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size} · {file.type}</p>
                  </div>
                  {file.status === "complete" ? (
                    <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20 shrink-0">
                      <CheckCircle2 className="size-3 mr-1" />Processed
                    </Badge>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs bg-destructive/10 text-destructive border-destructive/20 shrink-0">
                        <AlertCircle className="size-3 mr-1" />Failed
                      </Badge>
                      <Button variant="ghost" size="icon" className="size-7">
                        <RefreshCw className="size-3.5" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="shadow-none border border-border bg-primary/[0.02]">
        <CardContent className="py-4 px-5">
          <div className="flex items-start gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <Upload className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Getting the most from uploads</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Upload PDF, DOCX, or TXT for best AI analysis results</li>
                <li>• Include policy version numbers in the filename</li>
                <li>• Batch upload related policies together for comparative analysis</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
