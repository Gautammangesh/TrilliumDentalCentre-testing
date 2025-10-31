import Link from "next/link"
import { format } from "date-fns"
import { Calendar, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BlogCardProps {
  blog: {
    _id: string
    title: string
    slug: string
    description: string
    category: string
    featuredImage: {
      url: string
    }
    videoClip?: {
      url: string
    }
    views: number
    createdAt: string
  }
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <Card className="h-full transition-all hover:shadow-lg">
        {blog.featuredImage && (
          <div className="relative h-48 w-full overflow-hidden">
            <img
              src={blog.featuredImage.url || "/placeholder.svg"}
              alt={blog.title}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
            {blog.videoClip && (
              <Badge className="absolute right-2 top-2" variant="secondary">
                Video
              </Badge>
            )}
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(blog.createdAt), "MMM dd, yyyy")}</span>
            <Eye className="ml-auto h-4 w-4" />
            <span>{blog.views}</span>
          </div>
          <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
          <CardDescription className="line-clamp-3">{blog.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">{blog.category}</Badge>
        </CardContent>
      </Card>
    </Link>
  )
}
