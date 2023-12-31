"use client"
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
    const { data, error } = useSWR("/api/media", fetcher),
        history = data as history;
    
    if (error) return <Error className="w-96" />;
    if (!data) return <div className="h-screen w-96" />;
    let totalNonDuplicate = 0;
    let duplicateAlbumCount = 0;
    return (
        <div className="grid w-full max-w-4xl grid-cols-1 gap-6 pt-3 mt-3 text-center sm:grid-cols-2 content-evenly">
            {history.data.map((item: any, index: number) => {
                if (totalNonDuplicate >= 20) return;
                else if (history.data[index + 1]?.parent === item.parent) {
                    duplicateAlbumCount++;
                    return;
                } else if (history.data[index - 1]?.parent === item.parent) {
                    totalNonDuplicate++;
                    duplicateAlbumCount++;
                    return (
                        <div
                            key={item.title}
                            className="flex border-t-2 rounded-lg dark:bg-gray-900/75 bg-gray-200/50 border-t-white/20 animate-fade-up animation-fill-backward"
                            style={{
                                animationDelay: `${totalNonDuplicate * 0.05}s`,
                            }}
                        >
                            <picture className="flex-shrink-0 float-left m-2">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={80}
                                    height={80}
                                    className="object-cover rounded-lg aspect-square bg-violet-300"
                                />
                            </picture>
                            <div className="flex flex-col flex-shrink h-20 my-2 overflow-hidden text-left whitespace-nowrap">
                                <h1 className="min-w-0 overflow-hidden text-md overflow-ellipsis ">
                                    {item.parent}
                                </h1>
                                <p className="min-w-0 overflow-hidden text-sm text-gray-600 dark:text-gray-400 overflow-ellipsis">
                                    {item.artist}
                                </p>
                            </div>
                            <div className="flex-grow" />
                            <div className="flex items-center justify-center m-2 rounded-lg h-7 aspect-square bg-violet-400">
                                {duplicateAlbumCount}
                            </div>
                        </div>
                    );
                } else {
                    totalNonDuplicate++;
                    duplicateAlbumCount = 0;
                    return (
                        <div
                            key={item.title}
                            className="flex border-t-2 rounded-lg dark:bg-gray-900/75 bg-gray-200/50 border-t-white/20 animate-fade-up animation-fill-backward"
                            style={{
                                animationDelay: `${totalNonDuplicate * 0.05}s`,
                            }}
                        >
                            <picture className="flex-shrink-0 float-left m-2">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={80}
                                    height={80}
                                    className="object-cover rounded-lg aspect-square bg-violet-300"
                                />
                            </picture>
                            <div className="flex flex-col flex-shrink h-20 my-2 overflow-hidden text-left whitespace-nowrap">
                                <h1 className="overflow-hidden text-md overflow-ellipsis">
                                    {item.title}
                                </h1>
                                <p className="min-w-0 overflow-hidden text-sm text-gray-600 dark:text-gray-400 overflow-ellipsis">
                                    {item.artist}
                                </p>
                                <p className="min-w-0 overflow-hidden text-sm text-gray-500 overflow-ellipsis">
                                    {item.parent}
                                </p>
                            </div>
                        </div>
                    );
                }
            })}
        </div>
    );
}
