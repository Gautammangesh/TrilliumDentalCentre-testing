import { notFound } from "next/navigation"
import { format } from "date-fns"
import { Calendar, Eye, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

async function getBlog(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/blogs/${slug}`, {
    cache: "no-store",
  })

  if (!res.ok) return null

  const result = await res.json()
  return result.data
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const blog = await getBlog(slug)

  if (!blog) {
    notFound()
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 py-12">
      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="mb-8 overflow-hidden rounded-lg">
          <img
            src={blog.featuredImage.url || "/placeholder.svg"}
            alt={blog.title}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {/* Blog Header */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(blog.createdAt), "MMMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{blog.views} views</span>
          </div>
        </div>

        <h1 className="mb-4 text-4xl font-bold leading-tight">{blog.title}</h1>

        <p className="text-lg text-muted-foreground">{blog.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge>{blog.category}</Badge>
          {blog.tags.map((tag: string) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <Separator className="my-8" />

      {/* Video Clip */}
      {blog.videoClip && (
        <div className="mb-8">
          <video controls className="w-full rounded-lg" poster={blog.featuredImage?.url}>
            <source src={blog.videoClip.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </article>
  )
}
