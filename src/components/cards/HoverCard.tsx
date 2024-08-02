export default function HoverCard({ children, noHoverChildren }: { children: React.ReactNode, noHoverChildren?: React.ReactNode }) {
  return (
    <div>
      <div className="border-grey-300 group relative block h-52 w-full overflow-hidden rounded-xl border-4 shadow-lg outline-4 outline-violet-600 transition-transform duration-200 hover:scale-105 hover:outline">
        {children}
      </div>
      <div className="can-hover:hidden">{noHoverChildren}</div>
    </div>
  )
}