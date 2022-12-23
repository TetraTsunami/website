import useSWR from "swr";
import Error from "./util/Error";

interface history {
    timestamp: number;
    data: Record<string, any>[];
}
async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
): Promise<JSON> {
    const res = await fetch(input, init);
    return res.json();
}

export default function NowPlayingText() {
    const { data, error } = useSWR("/api/history", fetcher),
        history = data as history;
    
    if (error) return <Error className="w-96" />;
    if (!data) return <div className="w-96 h-screen" />;
    return (
        <div className="grid gap-6 pt-3 mt-3 text-center grid-cols-1 sm:grid-cols-2 w-full max-w-4xl content-evenly">
            {history.data.map((item: any, index: number) => {
                if (index >= 20) return;
                return (<div
                    key={index}
                    className="dark:bg-gray-900/75 bg-gray-200/50 rounded-lg border-t-white/20 border-t-2 flex animate-fade-up"
                    style={{ animationFillMode: "backwards", animationDelay: `${(index - index % 2) * 0.05}s` }}
                >
                    <picture className="float-left m-2 flex-shrink-0">
                        <img
                            src={item.imageUrl}
                            alt={item.title}
                            width={80}
                            height={80}
                            className="rounded-lg aspect-square object-cover bg-violet-300"
                        />
                    </picture>
                    <div className="flex flex-col my-2 h-20 text-left flex-shrink whitespace-nowrap overflow-hidden">
                        <h1 className="text-md overflow-hidden overflow-ellipsis">
                            {item.title}
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400 overflow-hidden overflow-ellipsis">
                            {item.artist}
                        </p>
                        <p className="text-sm text-gray-500 w-full  overflow-hidden overflow-ellipsis">
                            {item.parent}
                        </p>
                    </div>
                </div>
            )})}
        </div>
    );
}
