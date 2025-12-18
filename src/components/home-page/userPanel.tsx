import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { useQuery } from "@tanstack/react-query";
import fetchUser from "@/lib/getUserObject";
import { useNavigate } from "react-router";
import { userQueryOptions } from "@/lib/userQuery";

export default function UserPanel() {

    const { data } = useQuery(userQueryOptions)

    const navigate = useNavigate();

    return <Card className="min-w-sm m-5 max-h-50 flex items-center">
        <CardDescription>{data ? `You are logged in as ${data.username}` : "You are not logged in"}</CardDescription>
        <CardContent className="flex flex-col gap-5">
            <div className="flex gap-5">
                <Avatar>
                    <AvatarImage src={data?.avatarUrl} alt="@shadcn" />
                    <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <p>{data ? `${data.username}` : `Guest`}</p>
            </div>
            {
                data ? <Button onClick={() => navigate("/profile")}>Profile</Button>
                    :
                    <Button onClick={() => navigate("/login")}>Login</Button>
            }
        </CardContent>
    </Card>
}