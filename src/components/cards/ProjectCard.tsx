import Image, { StaticImageData } from "next/image";

type ProjectCardProps = {
    name: string;
    href: string;
    imageUrl: string | StaticImageData;
    description: string;
    year: string;
};

export default function ProjectCard({ name, href, imageUrl, description, year }: ProjectCardProps) {
    return (
        <section className="group border-4 border-grey-300 shadow-lg rounded-xl duration-200 overflow-clip relative hover:outline outline-4 outline-violet-600 aspect-video">
            <a href={href}>
                <Image
                    src={imageUrl}
                    alt={name}
                    width="360"
                    height="240"
                    layout="fill"
                    objectFit="cover"
                />
                <div className="p-6 min-h-full flex flex-col justify-center bg-white/90 backdrop-blur-sm relative top-[calc(100%-1.2rem)] group-hover:top-0 motion-safe:duration-500">
                    <span className="absolute top-0 right-5 italic text-sm font-semibold align-top text-left text-gray-900">
                        {year}
                    </span>
                    <h3 className="text-lg text-gray-700 pt-6">{name}</h3>
                    <p className="text-sm text-gray-600 pt-2 pb-4">
                        {description}
                    </p>
                </div>
            </a>
        </section>
    );

}