import { useInfiniteQuery } from "@tanstack/react-query";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { PostType, UserObject } from "@/types/types";
import { api } from "@/lib/axiosApi";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import LikeRewteet from "../home-page/like-retweet";
import { Skeleton } from "../ui/skeleton";
import PostComment from "../home-page/post-comments";

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
        const response = await api.get(`/user/posts?take=10&userId=${user?.id}`)
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

    return <div>
        {postQuery.data?.pages.map((page: Page) => {
            return page.posts.map((post: PostType) => {
                return <Card key={post.id} className="m-1 min-w-lg max-w-lg">
                    <CardHeader className="flex items-center">
                        <Avatar>
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>P</AvatarFallback>
                        </Avatar>
                        <CardTitle>{post.user.username}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="wrap-break-word whitespace-pre-wrap">{post.content}</p>
                    </CardContent>
                    <Separator />
                    <CardAction className="flex items-center justify-between min-w-full px-5">
                        <LikeRewteet post={post} />
                        <PostComment postId={post.id} />
                    </CardAction>
                </Card>
            })
        })}
    </div>
}


