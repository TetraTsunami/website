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
        <div className="relative group hover:z-10 border-4 border-grey-300 rounded-xl w-full hover:outline outline-4 outline-violet-600 shadow-xl transition-transform duration-200 hover:scale-105">
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
                    className="absolute bottom-3 right-3 rounded-full shadow-xl"
                >
                    <FontAwesomeIcon
                        icon={faCodepen}
                        className="p-4 bg-violet-300 text-black border-4 rounded-full hover:outline outline-4 duration-200 transition-transform group-hover:scale-105 group-hover:hover:scale-110 outline-violet-600"
                        size={"xl" as SizeProp}
                    />
                    <p className="visible-hidden">Codepen collection</p>
                </a>
            )}
        </div>
    );
}
