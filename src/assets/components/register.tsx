import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import NewModal from "./modal";


const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT)

export default function Register() {

    const formSchema = z.object({
        firstName: z.string().min(1).max(12),
        lastName: z.string().min(1).max(12),
        username: z.string().min(1).max(12),
        password: z.string().min(1).max(12)
    })

    type FormFields = z.infer<typeof formSchema>
    const [modalOpen, modalSetOpen] = useState(false);
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<FormFields>({ resolver: zodResolver(formSchema) });

    const onSubmit = async (data: FormFields) => {
        console.log(data)
        try {
            const response = await axios.post(`${SERVER_URL}:${SERVER_PORT}/api/auth/register`, data, {
                withCredentials: true
            })
            modalSetOpen(true)
        } catch (err: any) {
            const errorData = err.response.data.data;

            console.log(errorData)
            {
                errorData && Object.keys(errorData).forEach((field) => {
                    setError(field as any, {
                        type: "server",
                        message: errorData[field]
                    });
                });
            }
        }

    }


    return <Container>
        <Box>
            <Typography>Register a new account!</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl margin="dense">
                    <FormLabel>Register</FormLabel>
                    <TextField error={!!errors.firstName} helperText={errors.firstName && errors.firstName.message} label="First Name" {...register('firstName')} />
                    <TextField error={!!errors.lastName} helperText={errors.lastName && errors.lastName.message} label="Last Name" {...register('lastName')} />
                    <TextField error={!!errors.username} helperText={errors.username && errors.username.message} label="Username" {...register('username')} />
                    <TextField error={!!errors.password} helperText={errors.password && errors.password.message} label="Password" {...register('password')} />
                    <Typography display={"none"}></Typography>
                    <Button disabled={isSubmitting} variant="contained" type="submit">{isSubmitting ? "Submitting" : "Submit"}</Button>
                </FormControl>
            </form>
            <NewModal open={modalOpen} setOpen={modalSetOpen}>
                <Typography>Successfully Registered!</Typography>
                <Button href="/login">Login</Button>
            </NewModal>
        </Box>
    </Container>
}