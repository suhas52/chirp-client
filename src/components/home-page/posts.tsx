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


    const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isFetched } = useInfiniteQuery({
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


    return <ItemGroup>

        {data?.pages.map((page) =>
            page.posts.map((post: PostType) => (
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
                        <p className=" my-5 wrap-break-word whitespace-pre-wrap p-1 rounded-2xl">{post.content}</p>
                    </ItemContent>
                    <Separator />
                    <ItemActions className="flex w-full justify-between">
                        <LikeRewteet post={post} />
                        <div className="flex gap-5">
                            <PostComment postId={post.id} />
                            <Button onClick={() => navigate(`/post/${post.id}`)}>View post</Button>
                        </div>
                    </ItemActions>
                </Item>
            ))
        )}
        <Button ref={ref} className="w-15 self-center" disabled={!hasNextPage} onClick={() => fetchNextPage()}>{hasNextPage ? "Next" : "End"}</Button>
        <Separator orientation="horizontal" />
        {isFetchingNextPage && <Spinner className="self-center size-8" />}
        <p className="text-red-500 text-center" hidden={hasNextPage}>No more posts</p>
    </ItemGroup>
}