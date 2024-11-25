import Image, { StaticImageData } from "next/image";
import HoverCard from "./HoverCard";

export default function CertCard({
    name,
    certUrl,
    collectionUrl,
    imageUrl,
    year,
}: {
    name: string;
    certUrl: string;
    collectionUrl?: string;
    imageUrl: string | StaticImageData;
    year: string;
}) {
    return (
        <HoverCard>
            <div className="border-grey-300 hover:outlinex group h-56 overflow-clip rounded-xl border-4 border-content/80 shadow-xl outline-4 outline-accent transition-transform duration-200 focus-within:outline">
                <a href={certUrl}>
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width 1024px) 66vw, 33vw" 
                    />
                    <div className="absolute bottom-0 right-0 text-ellipsis whitespace-nowrap rounded-tl-lg bg-bkg/75 px-2 shadow-lg">
                        <span className="text-sm font-bold italic text-slate-900 dark:text-white">
                            {year}
                        </span>
                    </div>
                </a>
            </div>
            {collectionUrl && (
                <a
                    href={collectionUrl}
                    className="absolute bottom-0 left-0 rounded-tr-lg bg-bkg/75 px-2 text-sm text-slate-900 underline shadow-lg hover:text-accent dark:text-white"
                >
                    Codepen collection
                </a>
            )}
        </HoverCard>
    );
}
