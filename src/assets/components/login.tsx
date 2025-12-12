import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import z from "zod";
import NewModal from "./modal";
import { useState } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT)

export default function Login() {

    const formSchema = z.object({
        username: z.string().min(1).max(12),
        password: z.string().min(1).max(12)
    })

    type FormFields = z.infer<typeof formSchema>
    const [modalOpen, modalSetOpen] = useState(false);
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({ resolver: zodResolver(formSchema) });

    const onSubmit = async (data: FormFields) => {
        try {
            const response = await axios.post(`${SERVER_URL}:${SERVER_PORT}/api/auth/login`, data, {
                withCredentials: true,
            })
            modalSetOpen(true)
        } catch (err: any) {
            const errorData = err.response.data.data;
            {
                errorData && Object.keys(errorData).forEach((field) => {
                    setError(field as any, {
                        type: "server",
                        message: errorData[field]
                    });
                }
                )
            }
        }
    }

    return (<Box>
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
        <NewModal open={modalOpen} setOpen={modalSetOpen}>
            <Typography variant="h5" margin={2}>Successfully Logged in</Typography>
            <Button variant="contained" href="/home">Home</Button>
        </NewModal>
    </Box>
    )
}
