import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/GlobalCustomTheme";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/loginApi"; 
import {  useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import en from "../../translations/en";
import EmailInputField from "../../components/formComponents/EmailInputField";
import PasswordInputField from "../../components/formComponents/PasswordInputField";
import Copyright from "../../components/reusable/Copyright";

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { control, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();

  const {t, i18n} = useTranslation();

  const onSubmit = async (data: FormValues) => {
    try {
      console.log(data.email, data.password);

    const response = await fetch("http://localhost:8000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();
    console.log(response, "in api");
    console.log(result, "in result");

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    if (result.ok) {
      navigate("/");
    } else {
      alert(`Login failed: ${result.message}`);
      // change to toastify
    }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h2" variant="h6">
            {t("Welcome")} back to Histolingo Admin!
          </Typography>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <EmailInputField control={control} errors={errors} />
            <PasswordInputField control={control} errors={errors} />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Button fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} onClick={() => i18n.changeLanguage("en")}>Switch to English</Button>
            <Button fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} onClick={() => i18n.changeLanguage("vi")}>Switch to Vietnamese</Button>
            <Grid container>
              <Grid item xs>
                <Link href="/resetpassword" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
