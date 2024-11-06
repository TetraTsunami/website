import { getPostBundle } from "@/lib/posts";
import { getMDXComponent } from "mdx-bundler/client";
import React from "react";
import TableOfContents from "../../components/TableOfContents";
import type { Metadata } from "next";
import textStyles from "@/styles/text.module.scss";
import gridStyles from "@/styles/grid.module.scss";
import Giscus from "@/components/Giscus";

export const metadata: Metadata = {
  title: "Uses - Tsuni!",
};

export default async function Uses() {
  const post = await getPostBundle("uses", "src/pages");
  return <PostContent {...post} />;
}

const PostContent = ({
  code,
  tableOfContents,
}: Awaited<ReturnType<typeof getPostBundle>>) => {
  // it's a mouthful, but the props are essentially "the result of getPostBundle after it resolves"
  // usememo to avoid re-creating the component every render.
  const PostContent = React.useMemo(() => getMDXComponent(code), [code]);
  return (
    <article className={`mt-24 items-center px-2 sm:grid ${gridStyles.articleGrid}`}>
      <header className={`-z-10 mb-32 ${gridStyles.articleWide}`}>
        <h1 className="text-center text-6xl font-semibold">Uses</h1>
      </header>
      <div
        className={`prose prose-slate max-w-full rounded-xl bg-bkg/90 p-4 shadow-i-lg dark:prose-invert prose-code:font-[var(--font-neon)] md:px-12 md:py-8 ${textStyles.prose} ${gridStyles.articleContent}`}
      >
        <PostContent />
      </div>
      <nav className={`scrollspy top-20 hidden self-baseline rounded-xl bg-bkg/90 p-4 shadow-i-sm transition-colors sm:sticky sm:block md:p-6 ${gridStyles.articleToc}`}>
        <TableOfContents tableOfContents={tableOfContents} />
      </nav>
      <div className={`w-full mt-16 mb-32 shadow-i-lg max-w-[56rem] rounded-xl bg-slate-900/90 p-4 ${gridStyles.articleContent}`}>
        <Giscus />
      </div>
    </article>
  );
};
