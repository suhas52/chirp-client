import { Box, Button, Container, Stack, Typography } from "@mui/material";

export const outerContainerStyle = {
    textAlign: "center",
    paddingTop: "4rem",
    paddingBottom: "4rem",
    backgroundColor: "#f5f6fa",
    minHeight: "100vh"
};

export const headingStyle = {
    fontSize: "3rem",
    fontWeight: 700,
    marginBottom: "2rem",
};

export const innerContainerStyle = {
    display: "flex",
    flexDirection: "column",
    margin: "50px auto",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 8
};

export const stackedBoxStyle = {
    textAlign: "center",
    padding: "1.5rem",
    borderRadius: 8,
};

export const textStyle = {
    marginBottom: "0.5rem",
    fontSize: "1.1rem",
};

export const buttonStyle = {
    marginTop: "0.5rem",
    width: "160px",
};


export default function LandingPage() {
    return <Container sx={outerContainerStyle}>
        <Typography variant="h1" sx={headingStyle}>
            Welcome to Chirp
        </Typography>

        <Container sx={innerContainerStyle}>
            <Stack spacing={2}>
                <Box sx={stackedBoxStyle}>
                    <Typography sx={textStyle}>Please register to view the contents of this site!</Typography>
                    <Button href="/register" variant="contained" sx={buttonStyle}>
                        Register
                    </Button>
                </Box>

                <Box sx={stackedBoxStyle}>
                    <Typography sx={textStyle}>Already have an account?</Typography>
                    <Button href="/login" variant="contained" sx={buttonStyle}>
                        Login
                    </Button>
                </Box>
            </Stack>
        </Container>
    </Container>
}