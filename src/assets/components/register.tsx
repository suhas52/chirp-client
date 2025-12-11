import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import z, { promise } from "zod";

export default function Register() {

    const formSchema = z.object({
        username: z.string().min(1).max(12),
        password: z.string().min(1).max(12)
    })

    type FormFields = z.infer<typeof formSchema>

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(formSchema) });


    const onSubmit = async (data: any) => {
        console.log(data)
        const response = await axios.post("http://localhost:3000/api/auth/register", data)
        console.log(response)
    }

    return <Container>
        <Box>
            <Typography>Register a new account!</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl margin="dense">
                    <FormLabel>Register</FormLabel>
                    <TextField error={!!errors.username} helperText={errors.username && errors.username.message} label="Username" {...register('username')} />
                    <TextField error={!!errors.password} helperText={errors.password && errors.password.message} label="Password" {...register('password')} />
                    <Typography display={"none"}></Typography>
                    <Button disabled={isSubmitting} variant="contained" type="submit">{isSubmitting ? "Submitting" : "Submit"}</Button>
                </FormControl>
            </form>
        </Box>
    </Container>
}