import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export default function PostForm() {
    return <div className="min-w-lg bg-accent flex flex-col items-center border px-10 py-2 mt-2 rounded shadow-2xs">
        <Label className="self-start">Post:</Label>
        <Textarea className="m-5 bg-white"></Textarea>
        <Button size={"lg"} className="m-2">Submit</Button>
    </div>
}