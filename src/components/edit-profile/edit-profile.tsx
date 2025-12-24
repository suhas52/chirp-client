import { useQuery } from "@tanstack/react-query";
import ChangeUserDetailsForm from "./change-user-details-form";
import ChangeAvatar from "./change-avatar";
import { userQueryOptions } from "@/lib/userQuery";
import { Navigate } from "react-router";

export default function Profile() {
    const user = useQuery(userQueryOptions)
    if (!user.isFetched) return <p>Loading</p>
    if (!user.data) return <Navigate to={"/home"} />

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-10 md:flex-row md:items-start md:justify-center">
            <ChangeAvatar user={user.data} />
            <ChangeUserDetailsForm user={user.data} />
        </div>
    );
}