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
        <div className="relative w-full transition-transform duration-200 border-4 shadow-xl group hover:z-10 border-grey-300 rounded-xl overflow-clip focus-within:outline hover:outline outline-4 outline-violet-600 hover:scale-105">
            <a href={certUrl}>
                <Image
                    src={imageUrl}
                    alt={name}
                    width="1140"
                    height="886"
                    className="object-cover w-full h-full bg-pink-200 rounded-md dark:bg-gray-900"
                    sizes="530px"/>
                <div className="absolute bottom-0 left-0 right-0 shadow-lg bg-white/75 dark:bg-black/75 text-ellipsis whitespace-nowrap">
                    <span className="text-sm text-gray-900 dark:text-white">
                        {name}
                    </span>
                </div>
            </a>
            {collectionUrl && (
                <a
                    href={collectionUrl}
                    className="absolute rounded-full shadow-xl bottom-6 right-3"
                >
                    <FontAwesomeIcon
                        icon={faCodepen}
                        className="p-4 text-black transition-transform duration-200 border-4 rounded-full bg-violet-300 hover:outline outline-4 group-hover:scale-105 group-hover:hover:scale-110 outline-violet-600"
                        size={"xl" as SizeProp}
                    />
                    <p className="visible-hidden">Codepen collection</p>
                </a>
            )}
        </div>
    );
}
