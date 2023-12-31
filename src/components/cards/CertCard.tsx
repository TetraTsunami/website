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
        <div className="border-grey-300 group relative w-full overflow-clip rounded-xl border-4 shadow-xl outline-4 outline-violet-600 transition-transform duration-200 focus-within:outline hover:z-10 hover:scale-105 hover:outline">
            <a href={certUrl}>
                <Image
                    src={imageUrl}
                    alt={name}
                    width="1140"
                    height="886"
                    className="h-full w-full rounded-md bg-pink-200 object-cover dark:bg-gray-900"
                    sizes="530px"/>
                <div className="absolute bottom-0 left-0 right-0 text-ellipsis whitespace-nowrap bg-white/75 shadow-lg dark:bg-black/75">
                    <span className="text-sm text-gray-900 dark:text-white">
                        {name}
                    </span>
                </div>
            </a>
            {collectionUrl && (
                <a
                    href={collectionUrl}
                    className="absolute bottom-6 right-3 rounded-full shadow-xl"
                >
                    <FontAwesomeIcon
                        icon={faCodepen}
                        className="rounded-full border-4 bg-violet-300 p-4 text-black outline-4 outline-violet-600 transition-transform duration-200 hover:outline group-hover:scale-105 group-hover:hover:scale-110"
                        size={"xl" as SizeProp}
                    />
                    <p className="visible-hidden">Codepen collection</p>
                </a>
            )}
        </div>
    );
}
