import { useForm, } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

const postSchema = z.object({
    content: z.string().min(3, "Post cannot be less than 3 letter long").max(255, "Post cannot be more than 255 letters long")
})
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

type PostType = z.infer<typeof postSchema>

export default function PostForm() {

    const { register, reset, setError, handleSubmit, formState: { errors, isSubmitting } } = useForm<PostType>({
        resolver: zodResolver(postSchema)
    })

    const onSubmit = async (postData: PostType) => {
        try {
            const response = await axios.post(`${SERVER_URL}:${SERVER_PORT}/api/user/post`, postData, {
                withCredentials: true
            })
            console.log(response.data)
            reset()
        } catch (error: any) {
            console.log(error.response.data)
        }
    }


    return <form className="min-w-lg bg-accent flex flex-col items-center border px-10 py-2 mt-2 rounded shadow-2xs" onSubmit={handleSubmit(onSubmit)}>
        <Label className="self-start">Post:</Label>
        <Textarea {...register("content")} className="m-5 bg-white"></Textarea>
        <p hidden={!errors.content} className="text-sm text-red-700">{errors.content?.message}</p>
        <Button type="submit" size={"lg"} className="m-2">{isSubmitting ? "Submitting" : "Submit"}</Button>
    </form>
}