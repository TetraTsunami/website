import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NintendoFriendCode({ value }: { value: string }) {
    return (
        <div className="p-1 m-4 text-2xl font-bold rounded-full w-max bg-slate-200">
            <textarea readOnly rows={1} id="friend-code" className="ml-4 align-middle bg-transparent resize-none" value={value} />
            <button
                className="inline-block float-right w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-400"
                onClick={() => {
                    const text = document.getElementById("friend-code") as HTMLInputElement;
                    text.select();
                    text.setSelectionRange(0, 99999);
                    navigator.clipboard.writeText(value);
                }}
            >
                <FontAwesomeIcon icon={faClipboard} />
            </button>
        </div>
    );
}
