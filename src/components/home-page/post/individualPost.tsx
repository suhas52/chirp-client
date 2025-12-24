import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axiosApi";
import Post from "./post";
import Comments from "./comments";
import { userQueryOptions } from "@/lib/userQuery";


export default function IndividualPost() {
    const user = useQuery(userQueryOptions)
    const { postId } = useParams();
    const id = postId!;
    const getPost = async () => {
        if (user.data) {
            const response = await api.get(`/user/post/${postId}?userId=${user.data.id}`);

            return response.data.data
        }
        const response = await api.get(`/user/post/${postId}`);

        return response.data.data

    }

    const post = useQuery({
        queryKey: ['post', postId],
        queryFn: getPost,
        enabled: user.isFetched
    })

    console.log(post.data)
    if (!post.isFetched) return <p>Loading</p>

    return <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-6">
        <div className="flex justify-center">
            <Post post={post.data} />

        </div>
        Comments
        <Comments postId={id} />
    </div>
}