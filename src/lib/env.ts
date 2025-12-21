import z from "zod";

const envSchema = z.object({
    SERVER_URL: z.string().min(5, "server URL cannot be that small").max(255, "URL cannot be that long"),
    SERVER_PORT: z.string().min(2, "server PORT cannot be that small").max(5, "server PORT cannot be that long")
})

const envValidation = z.safeParse(envSchema, {
    SERVER_URL: import.meta.env.VITE_SERVER_URL,
    SERVER_PORT: import.meta.env.VITE_SERVER_PORT
})

if (!envValidation.success) throw new Error(envValidation.error.message)

export const envConf = envValidation.data;