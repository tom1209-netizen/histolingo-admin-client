import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/GlobalCustomTheme";
import { useNavigate } from "react-router-dom";
import Copyright from "../../components/reusable/Copyright";
import { useForm } from "react-hook-form";
import EmailInputField from "../../components/formComponents/EmailInputField";

interface FormValues {
  email: string;
}

export default function ForgetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);
  };
  const navigate = useNavigate();
  const handleBackToLogin = () => {
    navigate("/login");
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
          <Typography component="h1" variant="h5">
            Forgot password?
          </Typography>
          <Typography component="h2">
            No worries, we will send you reset instructions.
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <EmailInputField control={control} errors={errors} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Send link to reset password
            </Button>
            <Button
              onClick={handleBackToLogin}
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
            >
              Back to log in
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}