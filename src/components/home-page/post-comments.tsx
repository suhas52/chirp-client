import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Textarea } from "../ui/textarea"
import axios from "axios"
import { useState } from "react"

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;
const commentSchema = z.object({
    content: z.string().min(5, "Comment must be atleast 5 letters long")
        .max(255, "Your comment cannot be more than 255 letters long")
})

type CommentField = z.infer<typeof commentSchema>

export default function PostComment({ postId }: { postId: string }) {
    const [open, setOpen] = useState(false);
    const { register, setError, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<CommentField>({
        resolver: zodResolver(commentSchema)
    })

    const onSubmit = async (commentData: CommentField) => {
        try {
            const response = await axios.post(`${SERVER_URL}:${SERVER_PORT}/api/user/comment/${postId}`, commentData, {
                withCredentials: true
            })
            console.log(response.data.data)

        } catch (err) {

        }
    }



    return <div>
        <Dialog>

            <DialogTrigger asChild>
                <Button>Comment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]" aria-describedby="post comment">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Post comment</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 my-5">
                        {isSubmitSuccessful ? <p>Comment successfully posted</p> : <Textarea {...register("content")} />}
                        <DialogFooter className="mt-5">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button disabled={isSubmitSuccessful} type="submit">Submit</Button>
                        </DialogFooter>
                    </div>

                </form>
            </DialogContent>

        </Dialog>
    </div>
}