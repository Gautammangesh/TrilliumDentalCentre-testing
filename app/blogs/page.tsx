import { Suspense } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, Eye } from "lucide-react"
import { format } from "date-fns"

async function getBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blogs?published=true`, {
    cache: "no-store",
  })

  if (!res.ok) return { data: [], pagination: {} }

  const result = await res.json()
  return result
}

function BlogCardSkeleton() {
  return (
    <Card>
      <Skeleton className="h-48 w-full" />
      <CardHeader>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </CardHeader>
    </Card>
  )
}

async function BlogsList() {
  const { data: blogs } = await getBlogs()

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog: any) => (
        <Link key={blog._id} href={`/blogs/${blog.slug}`}>
          <Card className="h-full transition-all hover:shadow-lg">
            {blog.featuredImage && (
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={blog.featuredImage.url || "/placeholder.svg"}
                  alt={blog.title}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
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
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{blog.category}</Badge>
                {blog.videoClip && <Badge variant="outline">Video</Badge>}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default function BlogsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Dental Health Blog</h1>
        <p className="text-lg text-muted-foreground">Expert tips and insights for maintaining optimal oral health</p>
      </div>

      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        }
      >
        <BlogsList />
      </Suspense>
    </div>
  )
}
