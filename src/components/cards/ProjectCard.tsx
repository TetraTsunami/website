import Image, { StaticImageData } from "next/image";
import HoverCard from "./HoverCard";

type ProjectCardProps = {
    name: string;
    href: string;
    imageUrl: string | StaticImageData;
    description: string;
    year: string;
};

export default function ProjectCard({
    name,
    href,
    imageUrl,
    description,
    year,
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
        <HoverCard noHoverChildren={noHoverElement}>
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
                    className="relative top-full mx-auto flex h-full w-full -translate-y-5 flex-col justify-center rounded-lg bg-bkg/75 px-6 py-6 shadow-lg will-change-transform motion-safe:duration-200 can-hover:group-hover:-translate-y-full can-hover:group-hover:bg-bkg/90"
                >
                    <span className="absolute right-5 top-0 text-left align-top text-sm font-semibold italic text-slate-900 dark:text-white">
                        {year}
                    </span>
                    <h3 className="pt-6 text-lg text-gray-700 dark:text-white">
                        {name}
                    </h3>
                    <p className="py-2 text-sm text-gray-600 dark:text-slate-300">
                        {description}
                    </p>
                </div>
            </a>
        </HoverCard>
    );
}
