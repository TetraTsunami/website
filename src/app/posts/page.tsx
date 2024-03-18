import { PostData, getAllPostData } from "@/lib/posts"
import Image from "next/image"
import Link from "next/link"

const PostPreview = (data: PostData & { slug: string } ) => {
  return (
    <Link href={`/posts/${data.slug}`} className="block">
      <Image src={data.excerptImageUrl} alt={data.excerptImageAlt} width={200} height={200} />
      <h2>{data.title}</h2>
      <p>{data.date}</p>
      <p>{data.excerpt}</p>
    </Link>
  )
}

export default function AllPosts() {
  const posts = getAllPostData()
  return (
    <main className="mx-auto mt-16 flex max-w-[56rem] flex-col items-stretch">
      <header className="mb-8">
        <h1 className="text-center text-6xl font-semibold">Posts</h1>
      </header>
      <div className="transition-color w relative -top-16 mt-32 box-content rounded-xl bg-bkg p-4 shadow-i-lg sm:px-16 sm:py-8">
        <div className="mb-8 flex justify-between">
          {posts.map((post) => (
            <PostPreview key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </main>
  )
}