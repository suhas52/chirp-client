import axios from "axios";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "../ui/item";
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

                </Item>
            ))
        )}
        <Button ref={ref} className="w-15 self-center" disabled={!hasNextPage} onClick={() => fetchNextPage()}>{hasNextPage ? "Next" : "End of the page"}</Button>
        <Separator orientation="horizontal" />
        {isFetchingNextPage && <Spinner className="self-center size-8" />}
        <p className="text-red-500 text-center" hidden={hasNextPage}>No more posts</p>
    </ItemGroup>
}