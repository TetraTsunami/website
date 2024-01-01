import { getPostData } from "@/lib/posts"
import { getMDXComponent } from "mdx-bundler/client"
import React from "react"

export default async function Post({ params }: { params: { slug: string } }) {
    const { slug } = params
    const post = await getPostData(slug)
    return <PostContent {...post} />
}

const PostContent = ({code, frontmatter}: { slug: string, code: string, frontmatter: any  }) => {
  // it's generally a good idea to memoize this function call to
  // avoid re-creating the component every render.
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <div className="mt-32 pb-8">
        <div className="absolute inset-0 top-64 -z-10 bg-bkg/70"/>
        <div className="container mx-auto max-w-prose rounded-xl bg-bkg p-8 shadow-i-lg transition-colors">
            <header className="mb-16">
                <h1 className="text-4xl font-semibold">{frontmatter.title}</h1>
                <p>{frontmatter.description}</p>
            </header>
            <main>
                <Component />
            </main>
        </div>
    </div>
  )
}