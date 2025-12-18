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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/axiosApi"
import { useQueryClient } from "@tanstack/react-query"

const userDetailsSchema = z.object({
  firstName: z.string().min(3, "Cannot be less than 3 letters long").max(15, "Cannot be more than 15 letters long"),
  lastName: z.string().min(3, "Cannot be less than 3 letters long").max(15, "Cannot be more than 15 letters long")
})

type UserDetailsForm = z.infer<typeof userDetailsSchema>


export default function ChangeUserDetailsForm({ user }: any) {

  const queryClient = useQueryClient();
  const { register, handleSubmit, setError, formState: { errors }, reset } = useForm<UserDetailsForm>({
    resolver: zodResolver(userDetailsSchema)
  })


  const onSubmit = async (formData: UserDetailsForm) => {
    try {
      const response = await api.patch(`/auth/update-profile`, formData)

      queryClient.invalidateQueries({ queryKey: ['user'] })
      reset();
    } catch (error) {
      console.log(error)
    }
  }

  return <Card className="w-lg">
    <CardHeader>
      <CardTitle>Details</CardTitle>
      <CardDescription>
        Change your account details
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel>First Name</FieldLabel>
            <Input
              type="text"
              placeholder={user.data.firstName}
              {...register('firstName')}
            />
            <FieldError className={errors?.firstName?.message ? 'visible' : 'invisible'}>{errors?.firstName?.message ?? 'placeholder'}</FieldError>
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel >Last Name</FieldLabel>
            </div>
            <Input {...register('lastName')}
              type="text"
              placeholder={user.data.lastName}
            />
            <FieldError className={errors?.lastName?.message ? 'visible' : 'invisible'}>{errors?.lastName?.message ?? 'placeholder'}</FieldError>
          </Field>
          <Field>
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </CardContent>
  </Card>
}