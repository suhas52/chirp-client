import { userQueryOptions } from "@/lib/userQuery"
import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import AvatarHolder from "./avatar-holder";

export default function Navbar() {
    const user = useQuery(userQueryOptions)
    const navigate = useNavigate();

    if (!user.isFetched) return <div>
        <div className="min-w-5xl min-h-15">

        </div>
    </div>


    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
            <div className="mx-auto max-w-5xl px-4">
                <nav className="flex h-18 items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button onClick={() => navigate("/home")} className="rounded-md px-2 py-1 text-sm font-medium  transition hover:bg-slate-100 hover:text-slate-900">
                            Home
                        </Button>
                    </div>
                    <button onClick={() => navigate("/")} className="text-2xl font-semibold tracking-tight transition hover:opacity-80" >
                        chirp
                    </button>
                    <div className="flex items-center gap-4">
                        <Button onClick={() => navigate("/about")} className="rounded-md px-2 py-1 text-sm font-medium  transition hover:bg-slate-100 hover:text-slate-900" >
                            About
                        </Button>
                        <AvatarHolder user={user.data} />
                    </div>
                </nav>
            </div>
        </header>
    );

}