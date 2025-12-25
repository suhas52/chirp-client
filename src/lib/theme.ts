export function toggleTheme() {
    const root = document.documentElement
    root.classList.toggle("dark")
    localStorage.setItem(
        "theme",
        root.classList.contains("dark") ? "dark" : "light"
    )
}

export function initTheme() {
    const stored = localStorage.getItem("theme")
    if (stored === "dark") {
        document.documentElement.classList.add("dark")
    }
}