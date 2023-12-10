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
        <section className="group border-4 border-grey-300 shadow-lg rounded-xl overflow-hidden relative hover:outline outline-4 outline-violet-600 w-full h-52 transition-transform duration-200 hover:scale-105">
            <a href={href}>
                <Image
                    src={imageUrl}
                    alt={name}
                    className="bg-pink-200 dark:bg-gray-900 group-hover:scale-105 duration-1000 object-cover"
                    fill
                    sizes="100vw" />
                <div
                    className="py-6 h-full mx-auto w-full px-6 flex flex-col justify-center 
                bg-white/75 group-hover:bg-white/90 dark:bg-black/75 dark:group-hover:bg-black/90
                shadow-lg relative top-full -translate-y-5 group-hover:-translate-y-full rounded-lg will-change-transform motion-safe:duration-500"
                >
                    <span className="absolute top-0 right-5 italic text-sm font-semibold align-top text-left text-gray-900 dark:text-white">
                        {year}
                    </span>
                    <h3 className="text-lg text-gray-700 dark:text-white pt-6">
                        {name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-300 py-2">
                        {description}
                    </p>
                </div>
            </a>
        </section>
    );
}
