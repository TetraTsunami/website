export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
      <div className="relative pt-12 motion-safe:animate-fade-up" style={{minHeight: "calc(100vh - 4rem)"}}>
          {children}
      </div>
  );
}