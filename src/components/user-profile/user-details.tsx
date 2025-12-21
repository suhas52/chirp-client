import type { UserObject } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";



export default function UserDetails({ user }: { user: UserObject }) {

    return <div className="mt-5 ">
        <Card>
            <CardHeader>
                <CardTitle>User Details</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-5">
                    <Avatar >
                        <AvatarImage className="rounded" src={user.avatarUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>{user.username}</p>
                </div>
                <div className="pt-5">
                    <p>Name: {user.firstName} {user.lastName}</p>
                </div>
                <Separator />
                <div className="max-w-lg min-w-lg py-5">
                    <h4>About me</h4>
                    <p>{user.bio}</p>
                </div>
            </CardContent>
        </Card>
    </div>
}

