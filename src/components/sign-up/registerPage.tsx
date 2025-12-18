import { useQuery } from "@tanstack/react-query";
import { SignupForm } from "./signup-form";
import { userQueryOptions } from "@/lib/userQuery";
import { Navigate } from "react-router";

export default function Register() {
    const user = useQuery(userQueryOptions)

    if (user.data) return <Navigate to={"/home"} />

    return <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-lg w-full p-5 m-5 border-2 rounded-2xl shadow-2xl">
            <SignupForm />
        </div>
    </div>
}