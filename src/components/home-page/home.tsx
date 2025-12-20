import PostForm from "./postPostForm";
import Posts from "./posts";

export default function Homepage() {
    return <div className="h-screen flex flex-col items-center ">
        <div className="flex">
            <PostForm />
        </div>
        <Posts />
    </div>
}