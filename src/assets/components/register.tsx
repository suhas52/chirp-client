import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import NewModal from "./modal";


const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const SERVER_PORT = Number(import.meta.env.VITE_SERVER_PORT)


export const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f6fa",
    padding: "2rem",
};

export const boxStyle = {
    width: "100%",
    maxWidth: 420,
    padding: "2rem",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    boxShadow: "0px 4px 16px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
};

export const titleStyle = {
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: 600,
    marginBottom: "0.5rem",
};

export const formControlStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
};

export const submitButtonStyle = {
    marginTop: "0.5rem",
    padding: "0.75rem",
    fontWeight: 600,
};

export const modalTextStyle = {
    margin: "1rem",
    textAlign: "center",
    fontSize: "1.1rem",
};

export const modalButtonStyle = {
    margin: "0 auto",
    display: "block",
    marginBottom: "1rem",
};

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


    return <Container sx={containerStyle}>
        <Box sx={boxStyle}>
            <Typography sx={titleStyle}>Register a new account!</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl margin="dense" sx={formControlStyle}>
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
                <Typography sx={modalTextStyle} margin={2}>Successfully Registered!</Typography>
                <Button sx={modalButtonStyle} href="/login">Login</Button>
            </NewModal>
        </Box>
    </Container>
}