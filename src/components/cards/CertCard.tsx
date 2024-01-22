import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";

export default function CertCard({
    name,
    certUrl,
    collectionUrl,
    imageUrl,
}: {
    name: string;
    certUrl: string;
    collectionUrl?: string;
    imageUrl: string | StaticImageData;
}) {
    return (
        <div className="relative">
            
            <div className="border-grey-300 hover:outlinex group relative h-56 w-full overflow-clip rounded-xl border-4 border-content/80 shadow-xl outline-4 outline-accent transition-transform duration-200 focus-within:outline">
                <a href={certUrl}>
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="h-full w-full rounded-md bg-bkg object-cover"
                        sizes="(max-width: 600px) 100vw, (max-width 1024px) 66vw, 33vw" />
                    <div className="absolute bottom-0 left-0 right-0 text-ellipsis whitespace-nowrap bg-bkg/75 shadow-lg">
                        <span className="text-sm text-slate-900 dark:text-white">
                            {name}
                        </span>
                    </div>
                </a>
            </div>
            {collectionUrl && (
                <a
                    href={collectionUrl}
                    className="absolute bottom-6 right-3 rounded-full shadow-xl"
                >
                    <FontAwesomeIcon
                        icon={faCodepen}
                        className="rounded-full border-4 bg-violet-300 p-4 text-black outline-4 outline-violet-600 hover:outline active:bg-violet-400 group-hover:scale-105 group-hover:hover:scale-110"
                        size={"xl" as SizeProp}
                    />
                    <p className="visible-hidden">Codepen collection</p>
                </a>
            )}
        </div>
    );
}
