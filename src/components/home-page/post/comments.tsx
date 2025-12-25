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
    user: {
        avatarFileName: string;
        username: string;
        id: string;
    };
    avatarUrl: string;
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

    return (
        <ItemGroup className="w-full max-w-lg space-y-4">
            {comments?.pages.map((page: Page) =>
                page.comments.map((comment: Comment) => (
                    <Item
                        key={comment.id}
                        className="rounded-xl border border-border bg-card text-card-foreground p-4 shadow-sm">
                        <ItemContent className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={comment.avatarUrl} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                                <Link to={`/profile/${comment.user.id}`} className="text-sm font-medium text-foreground hover:underline">
                                    {comment.user.username}
                                </Link>
                            </div>

                            <p className=" rounded-lg bg-muted px-3 py-2 text-sm text-foreground whitespace-pre-wrap wrap-break-word">
                                {comment.content}
                            </p>
                        </ItemContent>
                    </Item>
                ))
            )}
            <div className="flex flex-col items-center gap-3 pt-2">
                <Button ref={ref} size="sm" disabled={!hasNextPage} onClick={() => fetchNextPage()}>
                    {hasNextPage ? "Load more" : "No more comments"}
                </Button>
                {isFetchingNextPage && (
                    <Spinner className="h-6 w-6" />
                )}
            </div>
            {!hasNextPage && <Separator orientation="horizontal" />}
        </ItemGroup >
    );
}