import React from "react"
import { getAllPostIds, getPostBundle } from "@/lib/posts"
import PostContent from "./PostContent"
import type { Metadata } from 'next'
 
type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props, 
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBundle(slug)
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.subtitle,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      images: [post.frontmatter.excerptImageUrl],
      url: `https://tsuni.dev/${slug}`,
      publishedTime: post.frontmatter.date,
      type: "article",
    },
  }
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post = await getPostBundle(slug)
    return <PostContent {...post} />
}

export function generateStaticParams(): { slug: string }[] {
  const slugs = getAllPostIds()
  return slugs.map(slug => ({ slug }))
}

export const dynamicParams = false // 404 on unknown paths