"use client";
import useSWR from "swr";
import Error from "./util/Error";
import NowPlayingDetail from "./NowPlayingDetail";

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

export default function NPComboGrid() {
    const { data, error } = useSWR("/api/media", fetcher),
        history = data as history;

    if (error) return <Error className="w-96" />;
    if (!data) return <div className="h-screen w-96" />;
    let totalNonDuplicate = 0;
    let duplicateAlbumCount = 0;
    return (
        <div className="mt-3 grid w-full max-w-4xl grid-cols-1 content-evenly gap-6 pt-3 text-center sm:grid-cols-2">
            <div className="row-span-2 rounded-2xl bg-bkg/55 p-4 shadow-i-md backdrop-blur-sm transition-colors motion-safe:animate-fade-up">
                <NowPlayingDetail />
            </div>
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
                            className="flex rounded-lg border-t-2 border-t-white/20 bg-bkg/75 animation-fill-backward motion-safe:animate-fade-up"
                            style={{
                                animationDelay: `${totalNonDuplicate * 0.05}s`,
                            }}
                        >
                            <picture className="float-left m-2 flex-shrink-0">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={80}
                                    height={80}
                                    className="aspect-square rounded-lg bg-violet-300 object-cover"
                                />
                            </picture>
                            <div className="my-2 flex h-20 flex-shrink flex-col overflow-hidden whitespace-nowrap text-left">
                                <h1 className="text-md min-w-0 overflow-hidden overflow-ellipsis">
                                    {item.parent}
                                </h1>
                                <p className="min-w-0 overflow-hidden overflow-ellipsis text-sm text-gray-600 dark:text-gray-400">
                                    {item.artist}
                                </p>
                            </div>
                            <div className="flex-grow" />
                            <div className="m-2 flex aspect-square h-7 items-center justify-center rounded-lg bg-violet-400">
                                {duplicateAlbumCount}
                            </div>
                        </div>
                    );
                } else {
                    totalNonDuplicate++;
                    duplicateAlbumCount = 0;
                    return (
                        <div
                            key={item.title + item.artist + item.parent}
                            className="flex animate-fade-up rounded-lg bg-bkg/80 shadow-i-sm animation-fill-backward"
                            style={{
                                animationDelay: `${totalNonDuplicate * 0.05}s`,
                            }}
                        >
                            <picture className="float-left m-2 flex-shrink-0">
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    width={80}
                                    height={80}
                                    className="aspect-square rounded-lg bg-violet-300 object-cover"
                                />
                            </picture>
                            <div className="my-2 flex h-20 flex-shrink flex-col overflow-hidden whitespace-nowrap text-left">
                                <h1 className="text-md overflow-hidden overflow-ellipsis">
                                    {item.title}
                                </h1>
                                <p className="min-w-0 overflow-hidden overflow-ellipsis text-sm text-gray-600 dark:text-gray-400">
                                    {item.artist}
                                </p>
                                <p className="min-w-0 overflow-hidden overflow-ellipsis text-sm text-gray-500">
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
