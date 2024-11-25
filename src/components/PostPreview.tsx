import { PostData } from "@/lib/posts"
import Link from "next/link"

export default function PostPreview(data: PostData & { slug: string } ) {
  return (
    <Link href={`/${data.slug}`} className="group relative block h-full w-full">
      <h2 className="text-2xl font-semibold">{data.title}</h2>
      <p className="mb-2 text-lg text-content/75">{data.subtitle}</p>
      <p>{data.excerpt}</p>
    </Link>
  )
}