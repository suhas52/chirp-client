import { useNavigate } from "react-router";
import { Button } from "./ui/button";


export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-1 items-center justify-center bg-background">
            <div className="flex items-center justify-center rounded-2xl bg-card p-12 shadow-sm">
                <div className="flex max-w-md flex-col items-center gap-8 px-4 text-center">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">Chirp</h1>
                        <p className="text-muted-foreground">A simple place to share thoughts, images, and ideas.</p>
                    </div>
                    <div className="flex w-full flex-col gap-3">
                        <Button size="lg" onClick={() => navigate("/register")}>Create account</Button>
                        <Button variant="outline" size="lg" onClick={() => navigate("/login")}>Sign in</Button>
                    </div>
                    <button onClick={() => navigate("/home")} className="text-sm text-muted-foreground transition hover:text-foreground">
                        Or continue as a guest
                    </button>
                </div>
            </div>
        </div>
    );
}