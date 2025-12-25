import { AvatarImage } from "../ui/avatar";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";

import { FieldError } from "../ui/field";
import { api } from "@/lib/axiosApi";
import { useQueryClient } from "@tanstack/react-query";


type FileUpload = {
    avatar: FileList
}

interface ResponseUserObject {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatarFileName: string;
    avatarUrl: string;
}

export default function ChangeAvatar({ user }: { user: ResponseUserObject }) {

    const queryClient = useQueryClient();
    const { register, setError, formState: { errors }, handleSubmit } = useForm<FileUpload>()
    const onSubmit = async (data: FileUpload) => {
        const formData = new FormData();
        formData.append("avatar", data.avatar[0]);
        try {
            const response = await api.patch(`/auth/update-avatar`, formData)
            queryClient.invalidateQueries({ queryKey: ['user'] })
        } catch (error: any) {
            console.log(error.response.data)
            setError('avatar', {
                type: "server",
                message: error.response.data.message
            })
        }
    }

    return (
        <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col items-center gap-3">
                    <p className="text-sm font-medium text-muted-foreground">Current avatar</p>
                    <Avatar className="h-40 w-40 border border-border">
                        <AvatarImage src={user.avatarUrl} />
                    </Avatar>
                </div>
                <div className="space-y-2">
                    <Label className="text-foreground">Upload new avatar</Label>
                    <Input type="file" {...register("avatar")} className="text-foreground file:text-foreground" />
                    <FieldError className={errors?.avatar?.message ? "visible" : "invisible"}>
                        {errors?.avatar?.message ?? "placeholder"}
                    </FieldError>
                </div>
                <Button className="w-full">Save avatar</Button>
            </form>
        </div>
    );
}