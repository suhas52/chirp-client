import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Button } from "../ui/button";

export default function UserPanel() {
    return <Card className="min-w-sm m-5 max-h-50 flex items-center">
        <CardDescription>You are currently logged in</CardDescription>
        <CardContent className="flex flex-col gap-5">
            <div className="flex gap-5">
                <Avatar>
                    <AvatarImage src="#" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>test</p>
            </div>
            <Button>Profile</Button>
        </CardContent>
    </Card>
}