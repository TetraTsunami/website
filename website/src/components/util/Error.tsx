import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Error({ className }: { className?: string }) {
  return (
    <div
      className={
        (className || "w-full h-full") +
        " bg-red-300/50 flex justify-center items-center rounded-xl"
      }
    >
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        className="m-2 text-3xl text-red-500"
      />
    </div>
  );
}
