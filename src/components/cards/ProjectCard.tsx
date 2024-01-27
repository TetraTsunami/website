import Image, { StaticImageData } from "next/image";

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
    return (
        <a href={href} className="border-grey-300 group relative block h-52 w-full overflow-hidden rounded-xl border-4 shadow-lg outline-4 outline-violet-600 transition-transform duration-200 hover:scale-105 hover:outline">
            <Image
                src={imageUrl}
                alt={`Screenshot of ${name}`}
                className="bg-bkg object-cover duration-1000 group-hover:scale-105"
                fill
                sizes="(max-width: 600px) 100vw, (max-width 1024px) 66vw, 33vw"
                quality={85}
                placeholder="blur"
            />
            <div
                className="relative top-full mx-auto flex h-full w-full -translate-y-5 flex-col justify-center rounded-lg bg-bkg/75 px-6 py-6 shadow-lg will-change-transform group-hover:-translate-y-full group-hover:bg-bkg/90 motion-safe:duration-200"
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
    );
}
