import { getPostBundle } from "@/lib/posts"
import { getMDXComponent } from "mdx-bundler/client"
import React from "react"
import TableOfContents from "../../components/TableOfContents"
import type { Metadata } from "next"
import textStyles from "@/styles/text.module.scss"

export const metadata: Metadata = {
  title: 'Uses - Tsuni!',
}

export default async function Uses() {
    const post = await getPostBundle("uses", "src/pages")
    return <PostContent {...post} />
}

const PostContent = ({code, tableOfContents}: Awaited<ReturnType<typeof getPostBundle>>) => {
  // it's a mouthful, but the props are essentially "the result of getPostBundle after it resolves"
  // usememo to avoid re-creating the component every render.
  const PostContent = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <article className="mt-24 flex flex-col items-center">
      <header className="-z-10 mb-8">
        <h1 className="text-center text-6xl font-semibold">Uses</h1>
      </header>
      <div className="mx-2 mb-16 mt-32 flex flex-row-reverse flex-wrap gap-2 sm:flex-nowrap">
        <TableOfContents tableOfContents={tableOfContents} />
        <div className={`prose prose-slate max-w-[56rem] rounded-xl bg-bkg/90 p-4 shadow-i-lg dark:prose-invert prose-code:font-[var(--font-neon)] md:px-12 md:py-8 ${textStyles.prose}`}>
          <PostContent />
        </div>
      </div>
    </article>
  )
}