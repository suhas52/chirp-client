import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { userQueryOptions } from "@/lib/userQuery";
import { api } from "@/lib/axiosApi";
import type { UserObject } from "@/types/types";

export default function FollowUser({ user }: { user: UserObject }) {
    const loggedInUserQuery = useQuery(userQueryOptions)
    const isNotFollowed = user.followers.length === 0;
    const queryClient = useQueryClient();
    const handleFollowToggle = async () => {
        try {
            const response = isNotFollowed ? await api.post(`/user/follow/${user.id}`) : await api.delete(`/user/follow/${user.id}`);
            queryClient.invalidateQueries({ queryKey: ['user', user.id] })
        } catch (err) {
            console.log(err)
        }
    }
    return <Button disabled={!loggedInUserQuery.isFetched || !loggedInUserQuery.data} size="sm"
        onClick={handleFollowToggle}>
        {user.followers.length === 0 ? "Follow" : "Unfollow"}
    </Button>
}