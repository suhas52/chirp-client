import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import z from "zod";

export default function Login() {

    const formSchema = z.object({
        username: z.string().min(1).max(12),
        password: z.string().min(1).max(12)
    })

    type FormFields = z.infer<typeof formSchema>

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(formSchema) });

    const onSubmit = (data: any) => {

        console.log(data)
    }

    return <Container>
        <Box>
            <Typography>Login to your account</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl margin="dense">
                    <FormLabel>Login</FormLabel>
                    <TextField error={!!errors.username} helperText={errors.username && errors.username.message} label="Username" {...register('username')} />
                    <TextField error={!!errors.password} helperText={errors.password && errors.password.message} label="Password" {...register('password')} />
                    <Typography display={"none"}></Typography>
                    <Button disabled={isSubmitting} variant="contained" type="submit">{isSubmitting ? "Submitting" : "Submit"}</Button>
                </FormControl>
            </form>
        </Box>
    </Container>
}