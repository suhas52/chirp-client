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

    if (userQuery.isFetching) return <p>Loading</p>

    if (!userQuery.data) return <p>Error</p>

    return (
        <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-6">
            <UserDetails user={userQuery.data} />
            <UserPosts user={userQuery.data} />
        </div>
    );
}