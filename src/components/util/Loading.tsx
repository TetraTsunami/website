import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Loading({
    icon,
    className,
}: {
    icon: IconDefinition;
    className?: string;
}) {
    return (
        <div
            className={
                (className || "w-full h-full") +
                " flex justify-center items-center rounded-xl"
            }
        >
            <FontAwesomeIcon
                icon={icon}
                className="text-3xl animate-spin m-2 text-gray-500/50"
            />
        </div>
    );
}
