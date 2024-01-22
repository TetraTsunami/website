import { getAllPostIds, getPostData } from "@/lib/posts"
import { getMDXComponent } from "mdx-bundler/client"
import React from "react"

export default async function Post({ params }: { params: { slug: string } }) {
    const { slug } = params
    const post = await getPostData(slug)
    return <PostContent {...post} />
}

const PostContent = ({code, frontmatter}: { slug: string, code: string, frontmatter: any  }) => {
  // avoid re-creating the component every render.
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  const date = new Date(frontmatter.date).toLocaleDateString("en-US", {weekday: "long", year: "numeric", month: "long", day: "numeric"})
  return (
    <article className="mt-16">
      <header className="container mx-auto mb-8 max-w-prose">
        <h1 className="text-center text-6xl font-semibold">{frontmatter.title}</h1>
      </header>
      <div className="relative mt-32 bg-bkg/70">
        <div className="container prose prose-slate relative -top-16 mx-auto max-w-prose rounded-xl bg-bkg px-8 py-4 shadow-i-lg transition-colors lg:prose-xl dark:prose-invert prose-code:font-[var(--font-neon)]">
          <div className="mb-8 flex justify-between">
            <p className="m-0 text-sm">{date}</p>
            <span className="mx-4 h-0 grow self-center border-b-2 border-b-accent" />
          </div>
          <Component />
        </div>
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPostIds()
  return posts.map(slug => {slug})
}