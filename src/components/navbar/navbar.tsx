import { userQueryOptions } from "@/lib/userQuery"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import AvatarHolder from "./avatar-holder";
import { toggleTheme } from "@/lib/theme";

export default function Navbar() {
    const user = useQuery(userQueryOptions)
    const navigate = useNavigate()

    if (!user.isFetched) return <div className="min-w-5xl min-h-15" />

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4">
                <nav className="flex h-18 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant={"outline"} onClick={() => navigate("/home")}>Home</Button>
                    </div>
                    <button onClick={() => navigate("/")} className="text-2xl font-semibold tracking-tight text-foreground">chirp</button>
                    <div className="flex items-center gap-4">
                        <Button variant={"outline"} onClick={() => navigate("/about")}>About</Button>
                        <Button variant={"outline"} onClick={toggleTheme}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-gray-800 dark:text-gray-200"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    className="block dark:hidden"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414M16.95 16.95l1.414 1.414M7.05 7.05 5.636 5.636M12 8a4 4 0 100 8 4 4 0 000-8z"
                                />
                                <path
                                    className="hidden dark:block"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                            </svg>
                        </Button>
                        <AvatarHolder user={user.data} />
                    </div>
                </nav>
            </div>
        </header>
    )
}