import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NintendoFriendCode({ value }: { value: string }) {
    return (
        <div className="w-max rounded-full text-2xl m-4 font-bold bg-slate-200 p-1">
            <textarea readOnly rows={1} id="friend-code" className="resize-none bg-transparent align-middle ml-4" value={value} />
            <button
                className="inline-block rounded-full float-right h-8 w-8 bg-gradient-to-r from-red-500 to-red-400"
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
