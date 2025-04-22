import { PostData } from "@/lib/posts"
import Link from "next/link"
import Image from "next/image"

export default function PostPreview(data: PostData & { slug: string } ) {
  return (
    <div className="border-bkg ring-accent group relative block w-full overflow-hidden rounded-xl border-2 bg-white/10 shadow-lg transition-transform duration-200 hover:scale-105 hover:ring-4">
      <Link href={`/${data.slug}`} className="group relative flex w-full items-center gap-4 p-2 lg:flex-col">
        <Image src={data.excerptImageUrl} alt={data.excerptImageAlt} width={500} height={300} className="max-w-1/3 h-52 rounded-lg object-cover lg:w-full lg:max-w-full" />
        <div>
          <h2 className="text-2xl font-semibold">{data.title}</h2>
          <p className="text-content/75 mb-2 text-lg">{data.subtitle}</p>
          <p>{data.excerpt}</p>
        </div>
      </Link>
    </div>
  )
}