import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Item, ItemContent, ItemGroup } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/lib/axiosApi"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";


interface Page {
    comments: Comment[];
    nextCursor: null;
}

interface Comment {
    content: string;
    createdAt: string;
    cursorId: number;
    id: string;
    user: User;
    avatarUrl: string;
}

interface User {
    avatarFileName: string;
    username: string;
    id: string;
}

export default function Comments({ postId }: { postId: string }) {

    const getComments = async ({ pageParam }: { pageParam: number | null }) => {
        if (pageParam) {
            const encodedPageParam = btoa(String(pageParam));
            const response = await api.get(`/user/comments/${postId}?cursor=${encodedPageParam}`);
            return response.data.data
        }
        const response = await api.get(`/user/comments/${postId}`)
        return response.data.data

    }

    const { ref, inView } = useInView()

    const { data: comments, hasNextPage, isFetchingNextPage, isFetched, fetchNextPage } = useInfiniteQuery({
        queryKey: ['comments', postId],
        queryFn: getComments,
        initialPageParam: null,
        getNextPageParam: (lastPage) => {

            return lastPage.nextCursor
        },
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }

    }, [inView, fetchNextPage, hasNextPage])

    if (!isFetched) return <h1>Loading</h1>
    console.log(comments)
    return <ItemGroup>

        {comments?.pages.map((page: Page) =>
            page.comments.map((comment: Comment) => (
                <Item
                    key={comment.id}
                    className="p-2 bg-slate-50 border border-slate-200 text-slate-900 m-1 min-w-xl max-w-lg flex flex-wrap"
                >
                    <ItemContent className="w-full">
                        <div className="flex gap-2 items-center">
                            <Avatar>
                                <AvatarImage src={comment.avatarUrl} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <Link to={`/profile/${comment.user.id}`}>{comment.user.username}</Link>
                        </div>
                        <p className="min-h-20 my-5 bg-amber-50 p-1 rounded-2xl">{comment.content}</p>
                    </ItemContent>
                </Item>
            ))
        )}
        <Button ref={ref} className="w-15 self-center" disabled={!hasNextPage} onClick={() => fetchNextPage()}>{hasNextPage ? "Next" : "End"}</Button>
        <Separator orientation="horizontal" />
        {isFetchingNextPage && <Spinner className="self-center size-8" />}
        <p className="text-red-500 text-center" hidden={hasNextPage}>No more posts</p>
    </ItemGroup>
}