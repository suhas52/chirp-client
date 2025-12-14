import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import PostForm from "./postPostForm";
import Posts from "./posts";

export default function Homepage() {
    return <div className="h-screen flex flex-col items-center ">
        <PostForm />
        <Posts />
    </div>
}