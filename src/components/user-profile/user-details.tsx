import type { UserObject } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

import FollowUser from "./follow-user";



export default function UserDetails({ user }: { user: UserObject }) {

    return (
        <div className="mt-6 w-full max-w-lg">
            <Card className="bg-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>User details</CardTitle>
                    <FollowUser user={user} />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium text-foreground">{user.username}</p>
                            <p className="text-sm text-muted-foreground">{user.firstName} {user.lastName}</p>
                        </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">About</h4>
                        <p className="text-sm text-foreground">{user.bio || "No bio yet."}</p>
                    </div>
                    <Separator />
                    <div className="flex gap-8">
                        <div>
                            <p className="text-sm font-medium text-foreground">{user._count.followers}</p>
                            <p className="text-xs text-muted-foreground">Followers</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">{user._count.following}</p>
                            <p className="text-xs text-muted-foreground">Following</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

