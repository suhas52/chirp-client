import { api } from "@/lib/axiosApi";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";

export default function LikeRewteet({ post }: { post: any }) {


    const queryClient = useQueryClient()

    const likeMutation = useMutation({
        mutationFn: () =>
            api.post(`/user/post/like/${post.id}`, {}, {
                withCredentials: true
            }),
        onSuccess: (updatedPost) => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            console.log(updatedPost)
        },
        onError: (error) => console.log(error)
    })

    const unLikeMutation = useMutation({
        mutationFn: () =>
            api.delete(`/user/post/like/${post.likes[0].id}`, { withCredentials: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })

    const retweetMutate = useMutation({
        mutationFn: () =>
            api.post(`/user/post/retweet/${post.id}`, {}, {
                withCredentials: true
            }),
        onSuccess: (updatedPost) => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
            console.log(updatedPost)
        },
        onError: (error) => console.log(error)
    })

    const unRetweetMutate = useMutation({
        mutationFn: () =>
            api.delete(`/user/post/retweet/${post.retweets[0].id}`, { withCredentials: true }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] })
        }
    })


    const handleLikePress = async () => {
        try {
            if (post.likes.length === 0) {
                likeMutation.mutate()
            }
            if (post.likes.length > 0) {
                unLikeMutation.mutate()
            }
        } catch (err) {
            console.log(err)
        }

    }

    const retweetPress = async () => {
        try {
            if (post.retweets.length === 0) {
                retweetMutate.mutate()
            }
            if (post.retweets.length > 0) {
                unRetweetMutate.mutate()
            }
        } catch (err) {
            console.log(err)
        }
    }


    return <div className="flex gap-5">
        <div className="flex gap-1">
            <svg onClick={handleLikePress} className={post.likes.length > 0 ? "fill-red-700" : ""} width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z" /></svg>
            <p>{post._count.likes}</p>
        </div>
        <div className="flex gap-1">
            <svg onClick={retweetPress} className={post.retweets.length > 0 ? "fill-green-700" : ""} width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>retweet</title>
                <path d="M8.013 22.033v-7.972h3.932l-5.902-6.892-6.026 6.893h3.947v11.896h17.468l-3.923-3.924h-9.496zM28.036 19.001v-11.958h-17.531l3.986 3.985h9.496v7.973h-3.932l5.901 6.893 6.026-6.893h-3.946z"></path>
            </svg>
            <p>{post._count.retweets}</p>
        </div>
    </div>
}