import styles from "./progress.module.scss";

export default function StyledProgress1({
    value,
    max,
    animate,
    indeterminate,
}: {
    value: number;
    max: number;
    animate?: boolean;
    indeterminate?: boolean;
}) {
    const style = {
        transitionDuration: `${animate ? 1000 : 0}ms`,
        width: "100%",
        transform: `translateX(${Math.min((value / max) * 100 - 100, 0).toFixed(2)}%)`,
    };

    return (
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-300/50 dark:bg-black/50">
            <div
                className={`rounded-full bg-purple-400 dark:bg-violet-300 absolute left-0 top-0 bottom-0 ease-linear origin-left transition-transform ${
                    indeterminate ? styles.indeterminate : undefined
                }`}
                style={indeterminate ? undefined : style}
            ></div>
        </div>
    );
}