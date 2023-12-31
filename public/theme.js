function getInitialColorMode() {
    const persistedColorPreference = window.localStorage.getItem("theme");
    const hasPersistedPreference = typeof persistedColorPreference === "string";

    if (hasPersistedPreference) {
        return persistedColorPreference;
    }

    // Media query
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const hasMediaQueryPreference = typeof mql.matches === "boolean";
    if (hasMediaQueryPreference) {
        return mql.matches ? "dark" : "light";
    }

    // No support
    return "light";
}

(function initTheme() {
    var theme = getInitialColorMode();
    if (theme === "dark") {
        document.querySelector("html").classList.add("dark", "noAnimate");
    }
})();
