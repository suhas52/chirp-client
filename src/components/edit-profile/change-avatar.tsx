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


    return <div className="max-w-lg border p-5 rounded-2xl shadow">
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                Current avatar:
                <Avatar className="w-50 h-50">
                    <AvatarImage src={user.avatarUrl}></AvatarImage>
                </Avatar>
            </div>
            <div className="flex flex-col gap-5 mt-5">
                <Label>Upload new avatar</Label>
                <Input type="file" {...register('avatar')} />
                <FieldError className={errors?.avatar?.message ? 'visible' : 'invisible'}>{errors?.avatar?.message ?? 'placeholder'}</FieldError>
                <Button>Submit</Button>
            </div>
        </form>
    </div>
}