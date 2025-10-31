"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface VideoUploadProps {
  onUploadComplete: (data: { url: string; publicId: string; duration?: number }) => void
  currentVideo?: { url: string; publicId: string }
  onRemove?: () => void
}

export function VideoUpload({ onUploadComplete, currentVideo, onRemove }: VideoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("video/")) {
      alert("Please upload a video file")
      return
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      alert("Video file size must be less than 100MB")
      return
    }

    setUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "blogs")
      formData.append("resourceType", "video")

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90))
      }, 500)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const result = await response.json()
      onUploadComplete(result.data)
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload video")
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleRemove = async () => {
    if (!currentVideo || !onRemove) return

    try {
      await fetch(`/api/upload?publicId=${currentVideo.publicId}&resourceType=video`, {
        method: "DELETE",
      })
      onRemove()
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  if (currentVideo) {
    return (
      <div className="space-y-4">
        <video controls className="w-full rounded-lg">
          <source src={currentVideo.url} type="video/mp4" />
        </video>
        <Button variant="destructive" size="sm" onClick={handleRemove}>
          <X className="mr-2 h-4 w-4" />
          Remove Video
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-12">
        <label className="cursor-pointer">
          <input type="file" accept="video/*" onChange={handleUpload} disabled={uploading} className="hidden" />
          <div className="flex flex-col items-center gap-2">
            {uploading ? (
              <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
            ) : (
              <Upload className="h-12 w-12 text-muted-foreground" />
            )}
            <p className="text-sm text-muted-foreground">{uploading ? "Uploading..." : "Click to upload video"}</p>
            <p className="text-xs text-muted-foreground">Max size: 100MB</p>
          </div>
        </label>
      </div>
      {uploading && <Progress value={progress} />}
    </div>
  )
}
