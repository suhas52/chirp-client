import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { useNavigate } from "react-router"
import { api } from "@/lib/axiosApi"

const loginSchema = z.object({
  username: z.string().min(3, "Username must have atleast 3 characters").max(12, "Username cannot exceed 12 letters"),
  password: z.string().min(3, "Password must have atleast 3 characters").max(12, "Password cannot exceed 12 letters")
})

type LoginFormFields = z.infer<typeof loginSchema>
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = import.meta.env.VITE_SERVER_PORT;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const navigate = useNavigate();
  const { handleSubmit, register, formState: { errors }, setError } = useForm<LoginFormFields>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (loginData: LoginFormFields) => {
    try {
      const response = await api.post(`/auth/login`, loginData, {
        withCredentials: true
      })
      navigate('/home')

    } catch (error: any) {
      console.log(error.response.data)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Username</FieldLabel>
                <Input
                  {...register("username")}
                  type="text"
                  placeholder="johndoe"
                  required
                />
                <FieldDescription className="text-red-700">{errors.username?.message}</FieldDescription>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input {...register("password")} type="password" required />
                <FieldDescription className="text-red-700">{errors.password?.message}</FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Login</Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/register">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
