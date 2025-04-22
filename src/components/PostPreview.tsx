import { PostData } from "@/lib/posts"
import Link from "next/link"

export default function PostPreview(data: PostData & { slug: string } ) {
  return (
    <Link href={`/posts/${data.slug}`} className="group relative block h-full w-full">
      <h2 className="text-2xl font-semibold">{data.title}</h2>
      <p className="text-content/75 mb-2 text-lg">{data.subtitle}</p>
      <p>{data.excerpt}</p>
    </Link>
  )
}