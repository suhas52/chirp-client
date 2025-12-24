import { useNavigate } from "react-router";
import { Button } from "./ui/button";


export default function LandingPage() {
    const navigate = useNavigate();

    return (<div className="flex flex-1 justify-center items-center bg-slate-100">
        <div className="flex  items-center justify-center bg-slate-50 p-50 rounded-2xl">
            <div className="flex max-w-md flex-col items-center text-center gap-8 px-4">
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                        Chirp
                    </h1>
                    <p className="text-slate-600">
                        A simple place to share thoughts, images, and ideas.
                    </p>
                </div>
                <div className="flex w-full flex-col gap-3">
                    <Button
                        size="lg"
                        onClick={() => navigate("/register")}
                    >
                        Create account
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigate("/login")}
                    >
                        Sign in
                    </Button>
                </div>
                <button
                    onClick={() => navigate("/home")}
                    className="text-sm text-slate-500 hover:text-slate-800 transition"

                >
                    Or continue as a guest
                </button>
            </div>
        </div>
    </div>
    );
}