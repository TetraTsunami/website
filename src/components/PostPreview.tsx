import { PostData } from "@/lib/posts"
import Image from "next/image"
import Link from "next/link"

export default function PostPreview(data: PostData & { slug: string } ) {
  return (
    <Link href={`/${data.slug}`} className="group relative flex w-full flex-col sm:flex-row">
      <div className="relative aspect-[16/9] min-h-56 overflow-clip rounded-xl">
        <Image src={data.excerptImageUrl} alt={data.excerptImageAlt} fill
        sizes="(max-width: 600px) 100vw, (max-width 1024px) 66vw, 33vw"
        className="object-cover" />
        <p className="absolute left-0 top-0 rounded-br-xl bg-bkg px-2 py-1 text-xs">{data.date}</p>
      </div>
      <div className="p-2">
        <h2 className="text-xl font-semibold">{data.title}</h2>
        <p className="mb-2 text-sm">{data.subtitle}</p>
        <p>{data.excerpt}</p>
      </div>
    </Link>
  )
}