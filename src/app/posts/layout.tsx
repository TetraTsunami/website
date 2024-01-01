import "./layout.scss";

export default function PostLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{paddingTop: "4rem", minHeight: "calc(100vh - 4rem)", position: "relative"}}>
            {children}
        </div>
    );
}