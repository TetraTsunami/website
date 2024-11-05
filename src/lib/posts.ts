import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import remarkGFM from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import rehypeSlug from "rehype-slug";
import rehypeSectionize from "@hbsnow/rehype-sectionize";
import GithubSlugger from "github-slugger";

export type PostData = {
  title: string;
  subtitle: string;
  isVisible: boolean;
  date: string;
  excerptImageUrl: string;
  excerptImageAlt: string;
  excerpt: string;
};

const postsDirectory = path.join(process.cwd(), "posts");
const componentsDirectory = path.join(process.cwd(), "src", "components");

export function getSortedPostsData() {
  const data = getAllPostData();
  // Sort posts by date
  return data.sort(({ date: a }, { date: b }) =>
    Date.parse(a) - Date.parse(b)
  );
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => fileName.replace(/\.mdx$/, ""));
}

export function getAllPostData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const data = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const metadata = matter(fileContents);
    if (!metadata.data.isVisible) return null;
    return {
      slug,
      ...metadata.data
    } as PostData & { slug: string };
  });
  return data.filter(Boolean) as (PostData & { slug: string })[];
}

type header = { indent: number, title: string, slug: string }

const extractTableOfContents = (markdown: string): header[] => {
  const slugger = new GithubSlugger();
  const headings = markdown.match(/^#+\s.+|.+\r?\n=+/gm);
  if (!headings) return [];
  const extracted = headings.map(heading => {
    const indent = heading.match(/#/g)?.length ?? 1;
    const title = heading.replace(/^#+\s/, "").replace(/=+$/, "").trim();
    const slug = slugger.slug(title);
    return { indent, title, slug };
  });
  // Normalize levels (0-based)
  const minLevel = Math.min(...extracted.map(({ indent }) => indent));
  extracted.forEach(header => {
    header.indent = header.indent - minLevel;
  });
  return extracted;
}

const calulateReadingTime = (markdown: string): number => {
    const wpm = 225;
    const words = markdown.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
}

export async function getPostBundle(slug: string, searchDirectory?: string) {
  const filePath = path.join(searchDirectory || postsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8").trim();
  const { code, frontmatter } = await bundleMDX({
    source, 
    mdxOptions(options: { remarkPlugins: any[]; rehypePlugins: any[] }) {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        remarkGFM,
        remarkBreaks,
      ]
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        rehypeSlug,
        rehypeSectionize
      ]
      return options
    },
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    cwd: componentsDirectory });
  const tableOfContents = extractTableOfContents(source);
  const readingMinutes = calulateReadingTime(source)
  return {
    slug,
    code,
    frontmatter,
    tableOfContents,
    readingMinutes
  };
}
