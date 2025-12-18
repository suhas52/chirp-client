import fetchUser from "@/lib/getUserObject";
import { useQuery } from "@tanstack/react-query";
import ChangeUserDetailsForm from "./change-user-details-form";
import ChangeAvatar from "./change-avatar";

export default function Profile() {
    const user = useQuery({
        queryKey: ['user'],
        queryFn: fetchUser,
        retry: false
    })

    if (!user) return <h1>Cannot access page</h1>
    if (!user.isFetched) return <p>Loading</p>


    return <div className="min-h-screen p-10 flex justify-between items-center">
        <ChangeAvatar user={user} />
        <ChangeUserDetailsForm user={user} />
    </div>
}