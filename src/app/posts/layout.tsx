export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="relative pt-12" style={{minHeight: "calc(100vh - 4rem)"}}>
          {children}
      </div>
  );
}