import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className="prose flex min-w-full flex-col items-center justify-center dark:prose-invert" style={{minHeight: "calc(100vh - 4rem)"}}>
      <h1>404</h1>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}