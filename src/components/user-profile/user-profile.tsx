import { useParams } from "react-router";
import UserDetails from "./user-details";
import UserPosts from "./user-posts";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axiosApi";

export default function OtherProfile() {
    const { userId } = useParams<{ userId: string }>();
    const id = userId!;

    const fetchUser = async (userId: string) => {
        const response = await api.get(`/auth/user/${userId}`)
        return response.data.data
    }

    const userQuery = useQuery({
        queryKey: ['user', id],
        queryFn: () => fetchUser(id)
    })

    return <div className="flex flex-1 justify-center">
        <UserDetails user={userQuery.data} />
        <UserPosts />
    </div>
}