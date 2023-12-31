import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NintendoFriendCode({ value }: { value: string }) {
    return (
        <div className="m-4 w-max rounded-full bg-slate-200 p-1 text-2xl font-bold">
            <textarea readOnly rows={1} id="friend-code" className="ml-4 resize-none bg-transparent align-middle" value={value} />
            <button
                className="float-right inline-block h-8 w-8 rounded-full bg-gradient-to-r from-red-500 to-red-400"
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
