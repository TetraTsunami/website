import Image, { StaticImageData } from "next/image";
import ReactTilt from 'react-universal-tilt';

export default function CertImageTilt({
    name,
    imageUrl,
}: {
    name: string;
    imageUrl: string | StaticImageData;
}) {
    return (
        <ReactTilt
            settings={{
                max: 25,
                reverse: true,
                scale: 1.1,
                shine: true,
                "shine-opacity": 0.5,
            }}
            className="border-4 border-grey-300 shadow-lg rounded-xl w-full hover:border-violet-300"
        >
            <Image
                src={imageUrl}
                alt={name}
                width="1140"
                height="886"
                className="rounded-md"
                sizes="100vw"
                style={{
                    width: "100%",
                    height: "auto"
                }} />
        </ReactTilt>
    );
}