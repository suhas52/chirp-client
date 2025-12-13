import { LoginForm } from "./login-form";

export default function Login() {
    return <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-lg p-5 m-5 rounded-2xl drop-shadow-2xl">
            <LoginForm />
        </div>
    </div>
}