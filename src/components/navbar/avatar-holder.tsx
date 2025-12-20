
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { api } from "@/lib/axiosApi";

export default function AvatarHolder({ user }: { user: any }) {
    const handleLogout = async () => {
        try {
            const response = await api.post(`/auth/logout`)

            navigate('/home')
        } catch (error: any) {
            console.log(error.response)
        }
    }

    const navigate = useNavigate();

    const ifLoggedIn = () => {
        return <div>
            <DropdownMenuItem>
                <Button onClick={() => navigate('/profile')} className="w-full">Profile</Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Button variant="destructive" className="w-full" onClick={handleLogout}>Logout</Button>
            </DropdownMenuItem>
        </div>
    }

    const ifLoggedOut = () => {
        return <div>
            <DropdownMenuItem>
                <Button onClick={() => navigate('/login')} className="w-full">Login</Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <Button onClick={() => navigate('/register')} className="w-full">Register</Button>
            </DropdownMenuItem>
        </div>
    }



    return <div className="px-2">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar>
                    <AvatarImage src={user?.avatarUrl}></AvatarImage>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {user ? ifLoggedIn() : ifLoggedOut()}
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}