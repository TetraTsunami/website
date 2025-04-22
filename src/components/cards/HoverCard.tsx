export default function HoverCard({ children, noHoverChildren, className }: { children: React.ReactNode, noHoverChildren?: React.ReactNode, className?: string }) {
  return (
    <div className={className}>
      <div className="border-bkg ring-accent group relative block h-52 w-full overflow-hidden rounded-xl border-2 shadow-lg transition-transform duration-200 hover:scale-105 hover:ring-4">
        {children}
      </div>
      <div className="can-hover:hidden">{noHoverChildren}</div>
    </div>
  )
}