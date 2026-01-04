import { useInfiniteQuery } from "@tanstack/react-query";
import type { PostType, UserObject } from "@/types/types";
import { api } from "@/lib/axiosApi";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import LikeRewteet from "../home-page/like-retweet";
import { Skeleton } from "../ui/skeleton";
import PostComment from "../home-page/post-comments";
import { Item, ItemActions, ItemContent, ItemGroup } from "../ui/item";
import { Link } from "react-router";
import { Button } from "../ui/button";

interface Page {
    posts: PostType[];
    nextCursor: number;
}



export default function UserPosts({ user }: { user: UserObject }) {


    const getPosts = async ({ pageParam }: { pageParam: number | null }) => {
        if (pageParam) {
            const encodedPageParam = btoa(String(pageParam));
            const response = await api.get(`/user/posts?take=10&cursor=${encodedPageParam}&userId=${user?.id}`)
            return response.data.data
        }
        const response = await api.get(`/user/posts/${user?.id}?take=10`)
        return response.data.data

    }

    const postQuery = useInfiniteQuery({
        queryKey: ['posts', user.id],
        queryFn: getPosts,
        initialPageParam: null,
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor
        },
    })
    console.log(postQuery.data)
    if (!postQuery.isFetched) {
        const count = 10;
        return (
            <div className="m-1 min-w-xl max-w-lg flex flex-wrap min-h-20">
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="flex flex-col space-y-3">
                        <Skeleton className="h-31.25 w-62.5 rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-62.5" />
                            <Skeleton className="h-4 w-50" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return <ItemGroup className="flex flex-col items-center gap-4">
        {postQuery.data?.pages.map((page: Page) =>
            page.posts.map((post: PostType) => (
                <Item key={post.id} className=" w-full max-w-lg rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <ItemContent className="p-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={post.avatarUrl} />
                                <AvatarFallback>
                                    {post.user.username.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <Link
                                to={`/profile/${post.user.id}`}
                                className="font-medium text-slate-900 hover:underline">
                                {post.user.username}
                            </Link>
                        </div>


                        {post.postImageUrl && (
                            <div className="mt-4 overflow-hidden rounded-lg border">
                                <img
                                    src={post.postImageUrl}
                                    alt=""
                                    className="w-full object-cover"
                                />
                            </div>
                        )}


                        <p className="mt-4 text-slate-800 whitespace-pre-wrap wrap-break-word">
                            {post.content}
                        </p>
                    </ItemContent>
                    <Separator />
                    <ItemActions className="flex flex-1 items-center justify-between px-4 py-3">
                        <LikeRewteet post={post} />
                        <div className="flex items-center gap-3">
                            <PostComment postId={post.id} />
                            <Button variant="outline" size="sm" onClick={() => console.log()}>
                                View post
                            </Button>
                        </div>
                    </ItemActions>
                </Item>
            ))
        )}

    </ItemGroup>
}


