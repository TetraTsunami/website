import Image, { StaticImageData } from "next/image";
import HoverCard from "./HoverCard";

type ProjectCardProps = {
    name: string;
    href: string;
    imageUrl: string | StaticImageData;
    description: string;
    year: string;
    size?: 1 | 2 | 3;
};

export default function ProjectCard({
    name,
    href,
    imageUrl,
    description,
    year,
    size = 1,
}: ProjectCardProps) {
    const noHoverElement = (
        <>
        <h3 className="pt-6 text-lg text-gray-700 dark:text-white">
            {name}
        </h3>
        <p className="py-2 text-sm text-gray-600 dark:text-slate-300">
            {description}
        </p>
        </>
    )
    return (
        <HoverCard noHoverChildren={noHoverElement} className={(size === 1 ? "w-48" : size === 2 ? "w-64" : "w-80") + " min-w-1/5 flex-grow xl:max-w-1/2"}>
            <a href={href} className="absolute inset-0">
                <Image
                    src={imageUrl}
                    alt={`Screenshot of ${name}`}
                    className="bg-bkg object-cover duration-1000 group-hover:scale-105"
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width 1024px) 66vw, 33vw"
                    quality={60}
                    placeholder="blur"
                />
                <div
                    className="can-hover:group-hover:-translate-y-full relative top-full mx-auto flex h-full w-full -translate-y-6 flex-col justify-center rounded-lg shadow-lg will-change-transform motion-safe:duration-200"
                >
                    <span className="bg-bkg/90 absolute right-5 top-1 h-4 rounded-t-lg px-4 text-left align-top text-sm font-semibold italic text-slate-900 dark:text-white">
                        {year}
                    </span>
                    <div className="bg-bkg/90 absolute bottom-0 left-0 right-0 top-5 rounded-lg" />
                    <div className="mask-t-from-80% absolute bottom-0 left-0 right-0 top-4 flex flex-col justify-center gap-2 overflow-y-auto px-4">
                        <h3 className="pt-4 text-lg text-gray-700 dark:text-white">
                            {name}
                        </h3>
                        <p className="pb-2 text-sm text-gray-600 dark:text-slate-300">
                            {description}
                        </p>
                    </div>
                </div>
            </a>
        </HoverCard>
    );
}
