import { useForm, } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axiosApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/userQuery";

const postSchema = z.object({
    content: z.string().min(3, "Post cannot be less than 3 letter long").max(255, "Post cannot be more than 255 letters long")
})

type PostType = z.infer<typeof postSchema>

export default function PostForm() {

    const { register, reset, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm<PostType>({
        resolver: zodResolver(postSchema)
    })

    const queryClient = useQueryClient();
    const user = useQuery(userQueryOptions)
    const onSubmit = async (postData: PostType) => {
        try {

            const response = await api.post("/user/post", postData)
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            reset()
        } catch (error: any) {
            console.log(error.response)
        }
    }


    return <form className="min-w-lg bg-accent flex flex-col items-center border px-10 py-2 mt-2 rounded-2xl shadow-2xs" onSubmit={handleSubmit(onSubmit)}>
        <Label className="self-start">Post:</Label>
        <Textarea {...register("content")} className="m-5 bg-white"></Textarea>
        <p hidden={!errors.content} className="text-sm text-red-700">{errors.content?.message}</p>
        <Button disabled={!user.data} type="submit" size={"lg"} className="m-2">{isSubmitting ? "Submitting" : "Submit"}</Button>
    </form>
}