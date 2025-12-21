import type { UserObject } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";



export default function UserDetails({ user }: { user: UserObject }) {

    console.log(user)

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
                <div className="max-w-lg min-w-lg py-5">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, accusantium cum, quod recusandae laudantium voluptate omnis, aspernatur officia ab voluptates voluptatum! Magni.</p>
                </div>
            </CardContent>
        </Card>
    </div>
}

