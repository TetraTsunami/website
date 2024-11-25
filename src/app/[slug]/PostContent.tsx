"use client";
import { getMDXComponent } from "mdx-bundler/client"
import React, { useContext, useEffect } from "react"
import TableOfContents from "../../components/TableOfContents"
import { BGDispatchContext } from "../providers"
import { getPostBundle } from "@/lib/posts";
import PostComponents from "@/components/PostComponents";
import gridStyles from "@/styles/grid.module.scss";

export default function PostContent({code, frontmatter, tableOfContents, readingMinutes}: Awaited<ReturnType<typeof getPostBundle>>) {
  // it's a mouthful, but the props are essentially "the result of getPostBundle after it resolves"
  // usememo to avoid re-creating the component every render.
  const PostContent = React.useMemo(() => getMDXComponent(code), [code]);
  const date = new Date(frontmatter.date).toLocaleDateString("en-US", {weekday: "long", year: "numeric", month: "long", day: "numeric"});
  const setTheme = useContext(BGDispatchContext);
  useEffect(() => {
    setTheme((theme) => ({...theme, focus: true }))
    return () => setTheme((theme) => ({...theme, focus: false }))
  })
  return (
    <article className="mt-24 flex flex-col items-center">
      <header className="-z-10 mb-8">
        <h1 className="text-center text-6xl font-semibold">{frontmatter.title}</h1>
      </header>
      <div className="mx-2 mb-16 mt-32 flex flex-row-reverse flex-wrap gap-2 sm:flex-nowrap">
        <nav className={`scrollspy top-20 hidden self-baseline rounded-xl bg-bkg/90 p-4 shadow-i-sm transition-colors sm:sticky sm:block md:p-6 ${gridStyles.articleToc}`}>
        <TableOfContents tableOfContents={tableOfContents} />
        </nav>
        <div className={`prose prose-slate max-w-[56rem] rounded-xl bg-bkg/90 p-4 shadow-i-sm transition-colors dark:prose-invert prose-code:font-[var(--font-neon)] md:px-12`}>
          <div className="mb-8 flex justify-between">
            <p className="m-0 text-sm">{date}</p>
            <span className="mx-4 h-0 grow self-center border-b-2 border-b-accent" />
            <p className="m-0 text-sm">{readingMinutes} minute read</p>
          </div>
          <PostContent components={PostComponents} />
        </div>
      </div>
    </article>
  )
}