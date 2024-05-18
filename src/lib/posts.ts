import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import gfmPlugin from 'remark-gfm'
import remarkBreaks from 'remark-breaks'

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

export async function getPostBundle(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8").trim();
  const { code, frontmatter } = await bundleMDX({
    source, 
    mdxOptions(options: { remarkPlugins: any[]; }) {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        gfmPlugin,
        remarkBreaks,
      ]

      return options
    },
    esbuildOptions(options) {
      options.target = "esnext"
      return options
    },
    cwd: componentsDirectory });
  return {
    slug,
    code,
    frontmatter,
  } as {
    slug: string;
    code: string;
    frontmatter: PostData;
  };
}
