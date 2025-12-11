import { Box, Button, Container, Stack, Typography } from "@mui/material";

export default function Home() {
    return <Container >
        <Typography variant="h1">Welcome to Chirp</Typography>
        <Container sx={{ display: "flex-column", margin: "50px", justifyContent: "center", alignItems: "center", }}>
            <Stack spacing={2}>
                <Box>
                    <Typography>Please register to view the contents of this site!</Typography>
                    <Button href="/register" variant="contained">Register</Button>
                </Box>
                <Box>
                    <Typography>Already have an account?</Typography>
                    <Button href="/login" variant="contained">Login</Button>
                </Box>
            </Stack>
        </Container>
    </Container>
}