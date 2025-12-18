import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axiosApi";
import fetchUser from "@/lib/getUserObject";
import Post from "./post";
import Comments from "./comments";
import UserPanel from "../userPanel";
import { userQueryOptions } from "@/lib/userQuery";


export default function IndividualPost() {
    const user = useQuery(userQueryOptions)
    const { postId } = useParams();
    const getPost = async () => {
        const response = await api.get(`/user/post/${postId}?userId=${user.data.id}`);

        return response.data.data
    }

    const { data: post, isFetched } = useQuery({
        queryKey: ['post', postId],
        queryFn: getPost,
        enabled: user.isFetched
    })


    if (!isFetched) return <p>Loading</p>

    return <div className="flex flex-col items-center">
        <div className="flex justify-center">
            <Post post={post} />
            <UserPanel />
        </div>
        <Comments postId={postId} />
    </div>
}