import PostForm from "./postPostForm";
import Posts from "./posts";
import UserPanel from "./user";

export default function Homepage() {
    return <div className="h-screen flex flex-col items-center ">
        <div className="flex">
            <PostForm />
            <UserPanel />
        </div>
        <Posts />
    </div>
}