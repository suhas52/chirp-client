import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface UserObject {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarFileName: string;
    avatarUrl: string;
}

export default function UserDetails({ user }: { user: UserObject }) {

    console.log(user)

    return <div>
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
            </CardContent>
        </Card>
    </div>
}

