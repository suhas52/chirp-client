import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { api } from "@/lib/axiosApi"
import { useQueryClient } from "@tanstack/react-query"
import type { UserObject } from "@/types/types"

const userDetailsSchema = z
  .object({
    firstName: z.string().min(3, "Cannot be less than 3 letters long").max(15, "Cannot be more than 15 letters long").optional(),
    lastName: z.string().min(3, "Cannot be less than 3 letters long").max(15, "Cannot be more than 15 letters long").optional(),
    bio: z.string().min(5, "Cannot be less than 5 letters long").max(255, "Cannot be more than 255 letters long").optional(),
  }).refine(
    (data) => data.firstName || data.lastName || data.bio,
    {
      message: "At least one field must be provided",
    }
  );

type UserDetailsForm = z.infer<typeof userDetailsSchema>


export default function ChangeUserDetailsForm({ user }: { user: UserObject }) {

  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserDetailsForm>({
    resolver: zodResolver(userDetailsSchema)
  })


  const onSubmit = async (formData: UserDetailsForm) => {
    try {
      await api.patch(`/auth/update-profile`, formData)
      queryClient.invalidateQueries({ queryKey: ['user'] })
      reset();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Details</CardTitle>
        <CardDescription>Change your account details</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Field>
            <FieldLabel>First name</FieldLabel>
            <Input type="text" placeholder={user.firstName}{...register("firstName")} />
            <FieldError className={errors?.firstName?.message ? "visible" : "invisible"}>
              {errors?.firstName?.message ?? "placeholder"}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel>Last name</FieldLabel>
            <Input type="text" placeholder={user.lastName} {...register("lastName")} />
            <FieldError className={errors?.lastName?.message ? "visible" : "invisible"}>
              {errors?.lastName?.message ?? "placeholder"}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel>Bio</FieldLabel>
            <Input type="text" placeholder={user.bio} {...register("bio")} />
            <FieldError className={errors?.bio?.message ? "visible" : "invisible"}>
              {errors?.bio?.message ?? "placeholder"}
            </FieldError>
          </Field>
          <div className="pt-2">
            <Button type="submit" className="w-full">Save changes</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}