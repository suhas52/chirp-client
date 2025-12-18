import { useNavigate } from "react-router";
import { Button } from "./ui/button";


export default function LandingPage() {

    const navigate = useNavigate();

    return <div className="min-h-screen flex flex-col justify-center items-center">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Welcome to Chirp
        </h1>
        <div className="pt-15 flex flex-col gap-5">
            <div className="flex gap-5">
                <Button onClick={() => navigate('/register')}>Register</Button>
                <Button onClick={() => navigate('/login')}>Login</Button>
            </div>
            <div className="flex flex-col">
                <p>Wanna see the posts?</p>
                <Button onClick={() => navigate('/home')}>Home</Button>
            </div>
        </div>
    </div>
}