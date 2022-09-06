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
        <div className="rounded-full h-1 w-full bg-gray-500 dark:bg-black relative overflow-hidden">
            <div
                className={`rounded-full bg-white dark:bg-violet-300 absolute left-0 top-0 bottom-0 ease-linear origin-left transition-transform ${
                    indeterminate ? styles.indeterminate : undefined
                }`}
                style={indeterminate ? undefined : style}
            ></div>
        </div>
    );
}