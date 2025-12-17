import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemActions, ItemContent } from "@/components/ui/item";

import { Link, useNavigate, useParams } from "react-router";
import LikeRewteet from "../like-retweet";
import PostComment from "../post-comments";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axiosApi";
import fetchUser from "@/lib/getUserObject";


export default function IndividualPost() {
    const user = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        retry: false
    })
    const navigate = useNavigate();
    const { postId } = useParams();
    const getPost = async () => {
        const response = await api.get(`/user/post/${postId}?userId=${user.data.id}`);

        return response.data.data
    }

    const { data: post, error, isFetched } = useQuery({
        queryKey: ['post', postId],
        queryFn: getPost,
        enabled: user.isFetched
    })

    console.log(post)

    if (!isFetched) return <p>Loading</p>

    return <div>
        <Item
            key={post.id}
            className="p-10 bg-slate-50 border border-slate-200 text-slate-900 m-1 min-w-xl max-w-lg flex flex-wrap"
        >
            <ItemContent className="w-full">
                <div className="flex gap-2 items-center">
                    <Avatar>
                        <AvatarImage src={post.avatarUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Link to={`/profile/${post.user.id}`}>{post.user.username}</Link>
                </div>
                <p className="min-h-20 my-5 bg-amber-50 p-1 rounded-2xl">{post.content}</p>
            </ItemContent>
            <ItemActions className="flex w-full justify-between">
                <LikeRewteet post={post} />
                <div className="flex gap-5">
                    <PostComment postId={post.id} />
                </div>
            </ItemActions>
        </Item>
    </div>
}