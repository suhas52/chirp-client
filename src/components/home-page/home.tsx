import PostForm from "./postPostForm";
import Posts from "./posts";

export default function Homepage() {
    return (
        <div className="bg-background">
            <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-6">
                <div className="rounded-xl border border-muted ">
                    <PostForm />
                </div>
                <Posts />
            </div>
        </div>
    );
}