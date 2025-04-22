import SmallPostPreview from "@/components/SmallPostPreview"
import { getAllPostData } from "@/lib/posts"
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Tsuni - Posts',
  description: 'A list of posts by Tsuni',
}

export default function AllPosts() {
  const posts = getAllPostData()
  return (
    <main className="container mx-auto mt-16 flex flex-col items-stretch">
      <header className="mb-8">
        <h1 className="text-center text-6xl font-semibold">Posts</h1>
      </header>
      <div className="bg-bkg/55 shadow-i-lg relative -top-16 mx-2 mt-32 box-content rounded-xl p-4 backdrop-blur-sm transition-colors md:p-8">
        <div className="grid gap-4 grid-cols-flow-96">
          {posts.map((post,  i) => (
            <div key={post.slug}>
              {i > 0 && <span key={i} className="bg-bkg h-[2px] w-full" />}
              <SmallPostPreview {...post} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}