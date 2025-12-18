import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { useNavigate } from "react-router";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/axiosApi";

const registerSchema = z.object({
  firstName: z.string().min(3).max(8),
  lastName: z.string().min(3).max(8),
  username: z.string().min(3).max(15),
  password: z.string().min(5).max(15),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
})

type RegisterFieldsType = z.infer<typeof registerSchema>;





export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const navigate = useNavigate();

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<RegisterFieldsType>({
    resolver: zodResolver(registerSchema)
  });


  const onSubmit = async (registerData: RegisterFieldsType) => {
    try {
      const response = await api.post(`/auth/register`, registerData)
      navigate('/login')

    } catch (error: any) {
      const validationErrorData = error.response.data.data ?? undefined;
      console.log(validationErrorData)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Fill in the form below to create your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="firstName">First Name</FieldLabel>
          <Input {...register("firstName")} type="text" placeholder="John" required />
          <FieldDescription className="text-red-700">
            {errors.firstName?.message}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
          <Input {...register("lastName")} type="text" placeholder="John" required />
          <FieldDescription className="text-red-700">
            {errors.lastName?.message}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input {...register("username")} type="text" placeholder="John" required />
          <FieldDescription className="text-red-700">
            {errors.username?.message}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input {...register("password")} type="password" required />
          <FieldDescription className="text-red-700">
            {errors.password?.message}
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input {...register("confirmPassword")} type="password" required />
          <FieldDescription className="text-red-700">
            {errors.confirmPassword?.message}
          </FieldDescription>
        </Field>
        <Field>
          <Button type="submit">{isSubmitting ? "Registering" : "Submit"}</Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/login">Log in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
