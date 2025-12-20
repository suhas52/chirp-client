import { userQueryOptions } from "@/lib/userQuery"
import { useQuery } from "@tanstack/react-query"
import { Button, buttonVariants } from "@/components/ui/button";
import { useNavigate } from "react-router";
import AvatarHolder from "./avatar-holder";

export default function Navbar() {
    const user = useQuery(userQueryOptions)
    const navigate = useNavigate();

    if (!user.isFetched) return <div>
        <div className="min-w-5xl min-h-15">

        </div>
    </div>


    return <div className="flex justify-center mt-1">
        <div className="min-w-5xl border min-h-15 flex justify-between shadow-2xl rounded-2xl">
            <div className="flex items-center mx-1">
                <Button onClick={() => navigate('/home')}>Home</Button>
            </div>
            <div onClick={() => navigate('/')}>
                <svg width="200" height="60" viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg">
                    <text
                        x="0"
                        y="45"
                        font-family="Arial, Helvetica, sans-serif"
                        font-size="48"
                        font-weight="600"
                        fill="currentColor"
                    >
                        chirp
                    </text>
                </svg>
            </div>
            <div className="flex items-center">
                <Button onClick={() => navigate('/about')}>About</Button>
                <AvatarHolder user={user.data} />
            </div>
        </div>
    </div>
}