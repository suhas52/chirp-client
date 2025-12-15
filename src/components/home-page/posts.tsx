import axios from "axios";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "../ui/item";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import { useInView } from 'react-intersection-observer'
import { useEffect } from "react";
import LikeRewteet from "./like-retweet";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

type Post = {
    id: string,
    content: string,
    updatedAt: Date,
    userId: string,
    _count: {
        likes: number,
        retweets: number
    },
    avatarUrl: string
    user: {
        username: string,
        avatarFileName: string,
    }
}

export default function Posts() {

    const getPosts = async ({ pageParam }: { pageParam: number }) => {
        const encodedPageParam = btoa(String(pageParam));
        const response = await axios.get(`${SERVER_URL}:${SERVER_PORT}/api/user/posts?take=10&cursor=${encodedPageParam}`)
        return response.data.data
    }


    const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {

            return lastPage.nextCursor
        }
    })

    const { ref, inView } = useInView()


    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }

    }, [inView, fetchNextPage, hasNextPage])
    console.log(data)
    return <ItemGroup>

        {data?.pages.map((page) =>
            page.posts.map((post: Post) => (
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
                            <p>{post.user.username}</p>
                        </div>
                        <p className="min-h-20 my-5 bg-amber-50 p-1 rounded-2xl">{post.content}</p>
                    </ItemContent>
                    <ItemActions className="flex w-full justify-between">
                        <LikeRewteet post={post} />
                        <Button>Comment</Button>
                    </ItemActions>
                </Item>
            ))
        )}
        <Button ref={ref} className="w-15 self-center" disabled={!hasNextPage} onClick={() => fetchNextPage()}>{hasNextPage ? "Next" : "End of the page"}</Button>
        <Separator orientation="horizontal" />
        {isFetchingNextPage && <Spinner className="self-center size-8" />}
        <p className="text-red-500 text-center" hidden={hasNextPage}>No more posts</p>
    </ItemGroup>
}