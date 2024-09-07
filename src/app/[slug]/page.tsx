import { getAllPostIds, getPostBundle } from "@/lib/posts"
import { getMDXComponent } from "mdx-bundler/client"
import React from "react"
import TableOfContents from "../../components/TableOfContents"

export default async function Post({ params }: { params: { slug: string } }) {
    const { slug } = params
    const post = await getPostBundle(slug)
    return <PostContent {...post} />
}

const PostContent = ({code, frontmatter, tableOfContents, readingMinutes}: Awaited<ReturnType<typeof getPostBundle>>) => {
  // it's a mouthful, but the props are essentially "the result of getPostBundle after it resolves"
  // usememo to avoid re-creating the component every render.
  const PostContent = React.useMemo(() => getMDXComponent(code), [code])
  const date = new Date(frontmatter.date).toLocaleDateString("en-US", {weekday: "long", year: "numeric", month: "long", day: "numeric"})
  return (
    <article className="mt-24 flex flex-col items-center">
      <header className="-z-10 mb-8">
        <h1 className="text-center text-6xl font-semibold">{frontmatter.title}</h1>
      </header>
      <div className="mx-2 mb-16 mt-32 flex flex-row-reverse flex-wrap gap-2 sm:flex-nowrap">
        <TableOfContents tableOfContents={tableOfContents} />
        <div className="prose prose-slate max-w-[56rem] rounded-xl bg-bkg/90 p-4 shadow-i-lg transition-colors dark:prose-invert prose-code:font-[var(--font-neon)] md:px-12">
          <div className="mb-8 flex justify-between">
            <p className="m-0 text-sm">{date}</p>
            <span className="mx-4 h-0 grow self-center border-b-2 border-b-accent" />
            <p className="m-0 text-sm">{readingMinutes} minute read</p>
          </div>
          <PostContent />
        </div>
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPostIds()
  return posts.map(slug => {slug})
}