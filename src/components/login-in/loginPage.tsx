import { userQueryOptions } from "@/lib/userQuery";
import { LoginForm } from "./login-form";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";

export default function Login() {
    const user = useQuery(userQueryOptions)

    if (user.data) return <Navigate to={"/home"} />

    return <div className="flex flex-1 items-center justify-center min-h-dvh">

        <div className="w-full max-w-lg p-5 m-5 rounded-2xl drop-shadow-2xl">
            <LoginForm />
        </div>
    </div>
}