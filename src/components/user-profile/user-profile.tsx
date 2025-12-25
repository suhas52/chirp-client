import { useParams } from "react-router";
import UserDetails from "./user-details";
import UserPosts from "./user-posts";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/axiosApi";
import { userQueryOptions } from "@/lib/userQuery";

export default function OtherProfile() {
    const { userId } = useParams<{ userId: string }>();
    const id = userId!;
    const loggedInUserQuery = useQuery(userQueryOptions)
    const fetchUser = async (userId: string) => {
        const response = await api.get(`/auth/user/${userId}?loggedUserId=${loggedInUserQuery.data.id}`)
        return response.data.data
    }

    const userQuery = useQuery({
        queryKey: ['user', id],
        queryFn: () => fetchUser(id)
    })

    if (userQuery.isFetching) {
        return (
            <div className="mx-auto min-w-lg flex max-w-2xl flex-col gap-6 px-4 py-6 animate-pulse">
                <div className="mt-6 w-full max-w-lg">
                    <div className="rounded-xl border bg-white p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="h-5 w-28 rounded bg-slate-200" />
                            <div className="h-8 w-24 rounded bg-slate-200" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-full bg-slate-200" />
                            <div className="space-y-2">
                                <div className="h-4 w-32 rounded bg-slate-200" />
                                <div className="h-3 w-40 rounded bg-slate-200" />
                            </div>
                        </div>
                        <div className="h-px w-full bg-slate-200" />
                        <div className="space-y-2">
                            <div className="h-4 w-16 rounded bg-slate-200" />
                            <div className="h-3 w-full rounded bg-slate-200" />
                            <div className="h-3 w-5/6 rounded bg-slate-200" />
                        </div>
                        <div className="h-px w-full bg-slate-200" />
                        <div className="flex gap-8">
                            <div className="space-y-1">
                                <div className="h-4 w-10 rounded bg-slate-200" />
                                <div className="h-3 w-16 rounded bg-slate-200" />
                            </div>
                            <div className="space-y-1">
                                <div className="h-4 w-10 rounded bg-slate-200" />
                                <div className="h-3 w-16 rounded bg-slate-200" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="w-full max-w-lg rounded-xl border bg-white shadow-sm"
                        >
                            <div className="p-4 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-slate-200" />
                                    <div className="h-4 w-32 rounded bg-slate-200" />
                                </div>
                                <div className="h-48 w-full rounded-lg bg-slate-200" />
                                <div className="space-y-2">
                                    <div className="h-3 w-full rounded bg-slate-200" />
                                    <div className="h-3 w-11/12 rounded bg-slate-200" />
                                    <div className="h-3 w-2/3 rounded bg-slate-200" />
                                </div>
                            </div>
                            <div className="h-px w-full bg-slate-200" />
                            <div className="flex items-center justify-between px-4 py-3">
                                <div className="h-8 w-20 rounded bg-slate-200" />
                                <div className="flex gap-3">
                                    <div className="h-8 w-8 rounded bg-slate-200" />
                                    <div className="h-8 w-24 rounded bg-slate-200" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!userQuery.data) return <p>Error</p>

    return (
        <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-6">
            <UserDetails user={userQuery.data} />
            <UserPosts user={userQuery.data} />
        </div>
    );
}