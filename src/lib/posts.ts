import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

const postsDirectory = path.join(process.cwd(), "posts");

// export function getSortedPostsData() {
//   const fileNames = fs.readdirSync(postsDirectory);
//   const allPostsData = fileNames.map((fileName) => {
//     const id = fileName.replace(/\.md$/, "");
//     const fullPath = path.join(postsDirectory, fileName);
//     const fileContents = fs.readFileSync(fullPath, "utf8");

//     // Use gray-matter to parse the post metadata section
//     const matterResult = matter(fileContents);

//     // Combine the data with the id
//     return {
//       id,
//       ...matterResult.data,
//     };
//   });
//   // Sort posts by date
//   return allPostsData.sort(({ date: a }, { date: b }) => {
//     if (a < b) {
//       return 1;
//     } else if (a > b) {
//       return -1;
//     } else {
//       return 0;
//     }
//   });
// }

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => fileName.replace(/\.mdx$/, ""));
}

export async function getPostData(slug: string) {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf8").trim();
  const { code, frontmatter } = await bundleMDX({source, cwd: postsDirectory});
  return {
    slug,
    code,
    frontmatter,
  };
}
