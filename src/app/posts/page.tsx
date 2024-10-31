import PostPreview from "@/components/PostPreview"
import { getAllPostData } from "@/lib/posts"
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Posts - Tsuni!',
}

export default function AllPosts() {
  const posts = getAllPostData()
  return (
    <main className="container mx-auto mt-16 flex flex-col items-stretch">
      <header className="mb-8">
        <h1 className="text-center text-6xl font-semibold">Posts</h1>
      </header>
      <div className="relative -top-16 mx-2 mt-32 box-content rounded-xl bg-bkg/55 p-4 shadow-i-lg backdrop-blur-sm transition-colors md:p-8">
        <div className="flex flex-col gap-6">
          {posts.map((post,  i) => (
            <div key={post.slug}>
              {i > 0 && <span key={i} className="h-[2px] w-full bg-bkg" />}
              <PostPreview {...post} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}