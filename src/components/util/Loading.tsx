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
                className="m-2 animate-spin text-3xl text-gray-500/50"
            />
        </div>
    );
}
