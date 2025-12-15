import axios from "axios";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "../ui/item";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";
import { useInView } from 'react-intersection-observer'
import { useEffect } from "react";

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
        },

    })

    const { ref, inView } = useInView()


    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }

    }, [inView, fetchNextPage, hasNextPage])

    return <ItemGroup>

        {data?.pages.map((page, pageIndex) =>
            page.posts.map((post: Post) => (
                <Item
                    key={post.id}
                    className="p-10 bg-amber-200 m-1 min-w-xl max-w-lg"
                >
                    <ItemContent>
                        <div className="flex gap-2 items-center">
                            <Avatar>
                                <AvatarImage src={post.avatarUrl} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <p>{post.user.username}</p>
                        </div>
                        <p>{post.content}</p>
                    </ItemContent>
                    <ItemActions>
                        <svg width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z" /></svg>
                        <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <title>retweet</title>
                            <path d="M8.013 22.033v-7.972h3.932l-5.902-6.892-6.026 6.893h3.947v11.896h17.468l-3.923-3.924h-9.496zM28.036 19.001v-11.958h-17.531l3.986 3.985h9.496v7.973h-3.932l5.901 6.893 6.026-6.893h-3.946z"></path>
                        </svg>
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