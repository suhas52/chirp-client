import fetchUser from "@/lib/getUserObject"
import { useQuery } from "@tanstack/react-query"

export default function LikeRewteet({ post }: { post: any }) {


    const { data } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        retry: false
    })

    const handleLikePress = async () => {

    }

    const retweetPress = async () => {

    }



    return <div className="flex gap-5">
        <div className="flex gap-1">
            <svg width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z" /></svg>
            <p>{post._count.likes}</p>
        </div>
        <div className="flex gap-1">
            <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>retweet</title>
                <path d="M8.013 22.033v-7.972h3.932l-5.902-6.892-6.026 6.893h3.947v11.896h17.468l-3.923-3.924h-9.496zM28.036 19.001v-11.958h-17.531l3.986 3.985h9.496v7.973h-3.932l5.901 6.893 6.026-6.893h-3.946z"></path>
            </svg>
            <p>{post._count.retweets}</p>
        </div>
    </div>
}