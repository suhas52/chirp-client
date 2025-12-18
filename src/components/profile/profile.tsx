import { useQuery, useQueryClient } from "@tanstack/react-query";
import ChangeUserDetailsForm from "./change-user-details-form";
import ChangeAvatar from "./change-avatar";
import { Button } from "../ui/button";
import { api } from "@/lib/axiosApi";
import { userQueryOptions } from "@/lib/userQuery";
import { Navigate, useNavigate } from "react-router";

export default function Profile() {
    const user = useQuery(userQueryOptions)
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    if (!user.data) return <Navigate to={"/home"} />
    if (!user.isFetched) return <p>Loading</p>

    const handleLogout = async () => {
        try {
            const response = await api.post(`/auth/logout`)

            navigate('/home')
        } catch (error: any) {
            console.log(error.response)
        }


    }

    return <div className="min-h-screen p-10 flex flex-col gap-10">
        <Button className="self-center" onClick={handleLogout}>Logout</Button>
        <div className="flex justify-between items-center">
            <ChangeAvatar user={user} />
            <ChangeUserDetailsForm user={user} />
        </div>

    </div>
}