import { getAllPostIds, getPostBundle } from "@/lib/posts"
import { getMDXComponent } from "mdx-bundler/client"
import React from "react"

export default async function Post({ params }: { params: { slug: string } }) {
    const { slug } = params
    const post = await getPostBundle(slug)
    return <PostContent {...post} />
}

const PostContent = ({code, frontmatter}: { slug: string, code: string, frontmatter: any  }) => {
  // avoid re-creating the component every render.
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  const date = new Date(frontmatter.date).toLocaleDateString("en-US", {weekday: "long", year: "numeric", month: "long", day: "numeric"})
  return (
    <article className="mt-16 flex flex-col items-stretch">
      <header className="mb-8">
        <h1 className="text-center text-6xl font-semibold">{frontmatter.title}</h1>
      </header>
      <div className="prose prose-slate relative -top-16 mx-auto mt-32 min-w-[56rem] rounded-xl bg-bkg p-4 shadow-i-lg transition-colors dark:prose-invert prose-code:font-[var(--font-neon)] sm:px-16 sm:py-8">
        <div className="mb-8 flex justify-between">
        <p className="m-0 text-sm">{date}</p>
        <span className="mx-4 h-0 grow self-center border-b-2 border-b-accent" />
        </div>
        <Component />
      </div>
    </article>
  )
}

export async function generateStaticParams() {
  const posts = await getAllPostIds()
  return posts.map(slug => {slug})
}