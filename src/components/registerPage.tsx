import { SignupForm } from "./signup-form";

export default function Register() {
    return <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-lg w-full p-5 m-5 border-2 rounded-2xl shadow-2xl">
            <SignupForm />
        </div>
    </div>
}