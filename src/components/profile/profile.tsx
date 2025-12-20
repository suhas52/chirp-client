import { useQuery } from "@tanstack/react-query";
import ChangeUserDetailsForm from "./change-user-details-form";
import ChangeAvatar from "./change-avatar";
import { userQueryOptions } from "@/lib/userQuery";
import { Navigate } from "react-router";

export default function Profile() {
    const user = useQuery(userQueryOptions)
    if (!user.data) return <Navigate to={"/home"} />
    if (!user.isFetched) return <p>Loading</p>

    return <div className="min-w-full p-10 flex flex-1 gap-10 items-center justify-center">
        <ChangeAvatar user={user} />
        <ChangeUserDetailsForm user={user} />
    </div>
}