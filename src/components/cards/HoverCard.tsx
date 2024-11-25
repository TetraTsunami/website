export default function HoverCard({ children, noHoverChildren }: { children: React.ReactNode, noHoverChildren?: React.ReactNode }) {
  return (
    <div>
      <div className="border-grey-300 group relative block h-52 w-full overflow-hidden rounded-xl border-4 shadow-lg ring-accent transition-transform duration-200 hover:scale-105 hover:ring-4">
        {children}
      </div>
      <div className="can-hover:hidden">{noHoverChildren}</div>
    </div>
  )
}