import React from "react"
import { getAllPostIds, getPostBundle } from "@/lib/posts"
import PostContent from "./PostContent"
import type { Metadata, ResolvingMetadata } from 'next'
 
export async function generateMetadata(
  { params }: { params: { slug: string } }, 
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params
  const post = await getPostBundle(slug)
  // @ts-expect-error - next.js types are wrong?
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    image: post.frontmatter.image,
    date: post.frontmatter.date,
    type: "article",
    url: `https://tsuni.dev/${slug}`,
    ...parent
  }
}

export default async function Post({ params }: { params: { slug: string } }) {
    const { slug } = params
    const post = await getPostBundle(slug)
    return <PostContent {...post} />
}

export function generateStaticParams(): { slug: string }[] {
  const slugs = getAllPostIds()
  return slugs.map(slug => ({ slug }))
}

export const dynamicParams = false // 404 on unknown paths