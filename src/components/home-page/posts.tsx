import axios from "axios";
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from "../ui/item";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
    user: {
        username: string,
        avatarFileName: string,
        avatarUrl: string
    }
}

export default function Posts() {

    const getPosts = async () => {
        const response = await axios.get(`${SERVER_URL}:${SERVER_PORT}/api/user/posts`)
        console.log(response.data.data)
        return response.data.data.posts
    }

    const postQuery = useQuery<Post[]>({ queryKey: ['posts'], queryFn: getPosts })

    return <ItemGroup>
        {postQuery.data?.map(post => {
            return <Item className="p-10 bg-amber-200 m-1 min-w-xl max-w-lg">
                <ItemContent>
                    <div className="flex gap-2 items-center">
                        <Avatar>
                            <AvatarImage src={post.user.avatarUrl} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>{post.user.username}</p>
                    </div>
                    <p>{post.content}</p>
                </ItemContent>
            </Item>
        })}
    </ItemGroup>
}