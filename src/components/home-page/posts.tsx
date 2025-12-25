import { Item, ItemActions, ItemContent, ItemGroup } from "../ui/item";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import { useInView } from 'react-intersection-observer'
import { useEffect } from "react";
import LikeRewteet from "./like-retweet";
import PostComment from "./post-comments";
import { api } from "@/lib/axiosApi";
import { Skeleton } from "../ui/skeleton";
import { Link, useNavigate } from "react-router";
import { userQueryOptions } from "@/lib/userQuery";
import type { PostType } from "@/types/types";


export default function Posts() {

    const navigate = useNavigate();
    const getPosts = async ({ pageParam }: { pageParam: number | null }) => {
        if (pageParam) {
            const encodedPageParam = btoa(String(pageParam));
            const response = await api.get(`/user/posts?take=10&cursor=${encodedPageParam}&userId=${user.data?.id}`)
            return response.data.data
        }
        const response = await api.get(`/user/posts?take=10&userId=${user.data?.id}`)
        return response.data.data

    }
    const user = useQuery(userQueryOptions)
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetched } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        initialPageParam: null,
        enabled: user.isFetched,
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor
        },
    })

    const { ref, inView } = useInView()


    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, fetchNextPage, hasNextPage])


    if (!isFetched) {
        const count = 10;
        return (
            <ItemGroup className="flex flex-col items-center gap-4">
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="mt-4 h-48 w-full rounded-lg" />
                        <div className="mt-4 space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-20 rounded-md" />
                        </div>
                    </div>
                ))}
            </ItemGroup>
        );
    }

    return (
        <ItemGroup className="flex flex-col items-center gap-4">
            {data?.pages.map((page) =>
                page.posts.map((post: PostType) => (
                    <Item
                        key={post.id}
                        className="w-full max-w-lg rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
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
                                    className="font-medium text-foreground hover:underline"
                                >
                                    {post.user.username}
                                </Link>
                            </div>
                            {post.postImageUrl && (
                                <div className="mt-4 overflow-hidden rounded-lg border border-border">
                                    <img src={post.postImageUrl} alt="" className="w-full object-cover" />
                                </div>
                            )}

                            <p className="mt-4 whitespace-pre-wrap warp-break-word text-foreground">
                                {post.content}
                            </p>
                        </ItemContent>
                        <Separator />
                        <ItemActions className="flex flex-1 items-center justify-between px-4 py-3">
                            <LikeRewteet post={post} />
                            <div className="flex items-center gap-3">
                                <PostComment postId={post.id} />
                                <Button variant="outline" size="sm" onClick={() => navigate(`/post/${post.id}`)}>
                                    View post
                                </Button>
                            </div>
                        </ItemActions>
                    </Item>
                ))
            )}
            <Button ref={ref} className="mt-4" disabled={!hasNextPage} onClick={() => fetchNextPage()}>{hasNextPage ? "Load more" : "End"}</Button>
            {isFetchingNextPage && <Spinner className="mt-2 size-8" />}
            {!hasNextPage && <p className="mt-2 text-sm text-muted-foreground">No more posts</p>}
        </ItemGroup>
    )
}
