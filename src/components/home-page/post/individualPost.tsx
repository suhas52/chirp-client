import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axiosApi";
import Post from "./post";
import Comments from "./comments";
import UserPanel from "../userPanel";
import { userQueryOptions } from "@/lib/userQuery";


export default function IndividualPost() {
    const user = useQuery(userQueryOptions)
    const { postId } = useParams();
    const getPost = async () => {
        if (user.data) {
            const response = await api.get(`/user/post/${postId}?userId=${user.data.id}`);

            return response.data.data
        }
        const response = await api.get(`/user/post/${postId}`);

        return response.data.data

    }

    const { data: post, isFetched } = useQuery({
        queryKey: ['post', postId],
        queryFn: getPost,
        enabled: user.isFetched
    })

    console.log(post)
    if (!isFetched) return <p>Loading</p>

    return <div className="flex flex-col items-center">
        <div className="flex justify-center">
            <Post post={post} />
            <UserPanel />
        </div>
        <Comments postId={postId} />
    </div>
}