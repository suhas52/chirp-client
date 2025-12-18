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
import { api } from "@/lib/axiosApi"
import { useQuery } from "@tanstack/react-query"
import { userQueryOptions } from "@/lib/userQuery"


const commentSchema = z.object({
    content: z.string().min(5, "Comment must be atleast 5 letters long")
        .max(255, "Your comment cannot be more than 255 letters long")
})

type CommentField = z.infer<typeof commentSchema>

export default function PostComment({ postId }: { postId: string }) {
    const { register, setError, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<CommentField>({
        resolver: zodResolver(commentSchema)
    })

    const onSubmit = async (commentData: CommentField) => {
        try {
            const response = await api.post(`/user/comment/${postId}`, commentData)


        } catch (err) {

        }
    }
    const user = useQuery(userQueryOptions)


    return <div>
        <Dialog>

            <DialogTrigger asChild>
                <Button disabled={!user.data}>Comment</Button>
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