import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemActions, ItemContent } from "@/components/ui/item";
import { Link } from "react-router";
import LikeRewteet from "../like-retweet";
import PostComment from "../post-comments";
import { Separator } from "@/components/ui/separator";
import type { PostType } from "@/types/types";



export default function Post({ post }: { post: PostType }) {
    return (
        <Item
            key={post.id}
            className="w-full min-w-lg max-w-lg rounded-xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
            <ItemContent className="p-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={post.avatarUrl} />
                        <AvatarFallback>
                            {post.user.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <Link to={`/profile/${post.user.id}`} className="font-medium text-foreground hover:underline">
                        {post.user.username}
                    </Link>
                </div>
                {post.postImageUrl && (
                    <div className="mt-4 overflow-hidden rounded-lg border border-border">
                        <img src={post.postImageUrl} alt="" className="w-full object-cover" />
                    </div>
                )}
                <p className="mt-4 whitespace-pre-wrap wrap-break-word text-foreground">{post.content}</p>
            </ItemContent>
            <Separator />
            <ItemActions className="flex flex-1 items-center justify-between px-4 py-3">
                <LikeRewteet post={post} />
                <div className="flex items-center gap-3">
                    <PostComment postId={post.id} />
                </div>
            </ItemActions>
        </Item>
    );
}