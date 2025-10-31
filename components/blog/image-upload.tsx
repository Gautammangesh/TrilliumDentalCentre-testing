"use client"

import type React from "react"

import { useState } from "react"
import { Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  onUploadComplete: (data: { url: string; publicId: string }) => void
  currentImage?: { url: string; publicId: string }
  onRemove?: () => void
}

export function ImageUpload({ onUploadComplete, currentImage, onRemove }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("folder", "blogs")
      formData.append("resourceType", "image")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Upload failed")

      const result = await response.json()
      onUploadComplete(result.data)
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    if (!currentImage || !onRemove) return

    try {
      await fetch(`/api/upload?publicId=${currentImage.publicId}&resourceType=image`, {
        method: "DELETE",
      })
      onRemove()
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  if (currentImage) {
    return (
      <div className="space-y-4">
        <img src={currentImage.url || "/placeholder.svg"} alt="Featured" className="w-full rounded-lg" />
        <Button variant="destructive" size="sm" onClick={handleRemove}>
          <X className="mr-2 h-4 w-4" />
          Remove Image
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-12">
      <label className="cursor-pointer">
        <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} className="hidden" />
        <div className="flex flex-col items-center gap-2">
          {uploading ? (
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          ) : (
            <Upload className="h-12 w-12 text-muted-foreground" />
          )}
          <p className="text-sm text-muted-foreground">{uploading ? "Uploading..." : "Click to upload image"}</p>
        </div>
      </label>
    </div>
  )
}
