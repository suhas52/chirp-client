import { useForm, } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/axiosApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/userQuery";
import { Input } from "../ui/input";

const postSchema = z.object({
    content: z.string().min(3, "Post cannot be less than 3 letter long").max(255, "Post cannot be more than 255 letters long"),
    file: z.instanceof(FileList).optional()
})

type PostType = z.infer<typeof postSchema>

export default function PostForm() {

    const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm<PostType>({
        resolver: zodResolver(postSchema)
    })

    const queryClient = useQueryClient();
    const user = useQuery(userQueryOptions)
    const onSubmit = async (postData: PostType) => {
        console.log("test")
        try {
            const formData = new FormData()
            formData.append("content", postData.content)

            if (postData.file) formData.append("post-image", postData.file[0])

            await api.post("/user/post", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })

            queryClient.invalidateQueries({ queryKey: ['posts'] })
            reset()
        } catch (error: any) {
            console.log(error.response)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}
            className="w-full rounded-xl border border-border bg-card p-4 shadow-sm flex flex-col gap-3">
            <Label className="text-sm font-medium text-foreground">Create post</Label>
            <Textarea {...register("content")} placeholder="What's on your mind?"
                className="min-h-25 resize-none border-border bg-background text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
            />

            {errors.content && (
                <p className="text-xs text-destructive">{errors.content.message}</p>
            )}
            <div className="flex items-center justify-between pt-2">
                <Input type="file" {...register("file")} className="max-w-xs text-sm text-foreground file:text-foreground" />
                <Button type="submit" size="sm" disabled={!user.data || isSubmitting}>
                    {isSubmitting ? "Posting…" : "Post"}
                </Button>
            </div>
        </form>
    );

}