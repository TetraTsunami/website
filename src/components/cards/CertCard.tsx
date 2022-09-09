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
        <div className="relative group hover:z-10 border-4 border-grey-300 rounded-xl w-full hover:outline outline-4 outline-violet-600 transition-colors shadow-xl">
            <a href={certUrl}>
                <Image
                    src={imageUrl}
                    alt={name}
                    width="1140"
                    height="886"
                    layout="responsive"
                    className="rounded-md bg-pink-200 dark:bg-gray-900"
                />
            </a>
            {collectionUrl && (
                <a
                    href={collectionUrl}
                    className="absolute duration-200 bottom-3 right-3 rounded-full shadow-md group-hover:scale-110"
                >
                    <FontAwesomeIcon
                        icon={faCodepen}
                        className="p-4 bg-violet-300 text-black border-4 rounded-full hover:outline outline-4 outline-violet-400 hover:bg-violet-400"
                        size={"xl" as SizeProp}
                    />
                    <p className="visible-hidden">Codepen collection</p>
                </a>
            )}
        </div>
    );
}
