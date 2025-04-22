"use client";
import { getMDXComponent } from "mdx-bundler/client"
import React, { useContext, useEffect } from "react"
import TableOfContents from "../../components/TableOfContents"
import { BGDispatchContext } from "../providers"
import { getPostBundle } from "@/lib/posts";
import PostComponents from "@/components/PostComponents";
import gridStyles from "@/styles/grid.module.css";
import 'rehype-callouts/theme/obsidian';
import Giscus from "@/components/Giscus";

export default function PostContent({code, frontmatter, tableOfContents, readingMinutes}: Awaited<ReturnType<typeof getPostBundle>>) {
  // it's a mouthful, but the props are essentially "the result of getPostBundle after it resolves"
  // usememo to avoid re-creating the component every render.
  const PostContent = React.useMemo(() => getMDXComponent(code), [code]);
  const date = new Date(frontmatter.date).toLocaleDateString("en-US", {weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "UTC"});
  const setTheme = useContext(BGDispatchContext);
  useEffect(() => {
    setTheme((theme) => ({...theme, focus: true }))
    return () => setTheme((theme) => ({...theme, focus: false }))
  })
  return (
    <article className="mt-24 flex flex-col items-center">
      <header className="-z-10 mb-8">
        <h1 className="pb-4 text-center text-6xl font-semibold">{frontmatter.title}</h1>
        <h2 className="text-center text-2xl font-light italic">{frontmatter.subtitle}</h2>
      </header>
      <div className={`mx-2 mb-16 mt-28 w-full ${gridStyles.articleGrid} gap-2`}>
        <div className={`bg-bkg/90 shadow-i-sm prose prose-slate ${gridStyles.articleContent} max-w-[56rem] rounded-xl p-4 transition-colors dark:prose-invert prose-h1:mb-4 prose-h1:mt-8 prose-p:mt-0 prose-code:font-[var(--font-neon)] md:px-12`}>
          <div className="mb-8 flex justify-between">
            <p className="mb-0 text-sm">{date}</p>
            <span className="border-b-accent mx-4 h-0 grow self-center border-b-2" />
            <p className="mb-0 text-sm">{readingMinutes} minute read</p>
          </div>
          <PostContent components={PostComponents} />
        </div>
        <nav className={`scrollspy top-20 self-baseline rounded-xl bg-bkg/90 p-4 shadow-i-sm transition-colors md:sticky md:p-6 ${gridStyles.articleToc}`}>
          <TableOfContents tableOfContents={tableOfContents} />
        </nav>
      </div>
      <div className={`w-full mt-16 mb-32 shadow-i-lg max-w-[56rem] rounded-xl bg-slate-900/90 p-4 ${gridStyles.articleContent}`}>
        <Giscus />
      </div>
    </article>
  )
}