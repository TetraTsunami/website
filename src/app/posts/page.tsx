import { PostData, getAllPostData } from "@/lib/posts"
import Image from "next/image"
import Link from "next/link"

const PostPreview = (data: PostData & { slug: string } ) => {
  return (
    <Link href={`/posts/${data.slug}`}>
      <img src={data.excerptImageUrl} alt={data.excerptImageAlt} width={200} height={200} />
      <h2>{data.title}</h2>
      <p>{data.date}</p>
      <p>{data.excerpt}</p>
    </Link>
  )
}

export default function AllPosts() {
  const posts = getAllPostData()
  return (
    <div>
      {posts.map((post) => (
        <PostPreview key={post.slug} {...post} />
      ))}
    </div>
  )
}