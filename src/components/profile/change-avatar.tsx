import z from "zod";
import { AvatarImage } from "../ui/avatar";
import { Avatar } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldError } from "../ui/field";
import { api } from "@/lib/axiosApi";


type FileUpload = {
    avatar: FileList
}

export default function ChangeAvatar({ user }: any) {

    const { register, setError, formState: { errors }, handleSubmit } = useForm<FileUpload>()

    const onSubmit = async (data: FileUpload) => {
        const formData = new FormData();
        formData.append("file", data.avatar[0]);
        console.log(formData)
        try {
            const response = await api.patch(`/auth/update-avatar`, formData)
        } catch (error: any) {
            console.log(error.response.data)
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)}>
        Current avatar:
        <Avatar className="w-50 h-50">
            <AvatarImage src={user.data.avatarUrl}></AvatarImage>
        </Avatar>
        <Label>Upload new avatar</Label>
        <Input type="file" {...register('avatar')}
            onChange={(event) =>
                event.target.files && event.target.files[0]
            } />
        <FieldError>{errors?.avatar?.message}</FieldError>
        <Button>Submit</Button>
    </form>
}