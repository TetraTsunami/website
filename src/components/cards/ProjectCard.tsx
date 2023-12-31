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
        <section className="relative w-full overflow-hidden transition-transform duration-200 border-4 shadow-lg group border-grey-300 rounded-xl hover:outline outline-4 outline-violet-600 h-52 hover:scale-105">
            <a href={href}>
                <Image
                    src={imageUrl}
                    alt={name}
                    className="object-cover duration-1000 bg-pink-200 dark:bg-gray-900 group-hover:scale-105"
                    fill
                    sizes="530px"
                />
                <div
                    className="relative flex flex-col justify-center w-full h-full px-6 py-6 mx-auto -translate-y-5 rounded-lg shadow-lg bg-white/75 group-hover:bg-white/90 dark:bg-black/75 dark:group-hover:bg-black/90 top-full group-hover:-translate-y-full will-change-transform motion-safe:duration-500"
                >
                    <span className="absolute top-0 text-sm italic font-semibold text-left text-gray-900 align-top right-5 dark:text-white">
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
        </section>
    );
}
