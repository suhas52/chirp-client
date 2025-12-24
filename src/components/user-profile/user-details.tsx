import type { UserObject } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";



export default function UserDetails({ user }: { user: UserObject }) {

    return (
        <div className="mt-6 w-full max-w-lg">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>User details</CardTitle>
                    <Button size="sm">Follow</Button>
                </CardHeader>

                <CardContent className="space-y-6">

                    {/* Identity */}
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div>
                            <p className="font-medium text-slate-900">
                                {user.username}
                            </p>
                            <p className="text-sm text-slate-500">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* About */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-slate-600">
                            About
                        </h4>
                        <p className="text-sm text-slate-800">
                            {user.bio || "No bio yet."}
                        </p>
                    </div>

                    <Separator />

                    {/* Stats */}
                    <div className="flex gap-8">
                        <div>
                            <p className="text-sm font-medium text-slate-900">0</p>
                            <p className="text-xs text-slate-500">Followers</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-900">0</p>
                            <p className="text-xs text-slate-500">Following</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

