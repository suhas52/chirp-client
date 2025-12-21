import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemActions, ItemContent } from "@/components/ui/item";
import { Link } from "react-router";
import LikeRewteet from "../like-retweet";
import PostComment from "../post-comments";
import { Separator } from "@/components/ui/separator";
import type { PostType } from "@/types/types";



export default function Post({ post }: { post: PostType }) {
    return <Item
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
            <p className="min-h-20 my-5 wrap-break-word whitespace-pre-wrap p-1 rounded-2xl">{post.content}</p>
        </ItemContent>
        <Separator />
        <ItemActions className="flex w-full justify-between">
            <LikeRewteet post={post} />
            <div className="flex gap-5">
                <PostComment postId={post.id} />
            </div>
        </ItemActions>
    </Item>
}