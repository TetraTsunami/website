export default function HoverCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-grey-300 group relative block h-52 w-full overflow-hidden rounded-xl border-4 shadow-lg outline-4 outline-violet-600 transition-transform duration-200 hover:scale-105 hover:outline">
      {children}
    </div>
  )
}