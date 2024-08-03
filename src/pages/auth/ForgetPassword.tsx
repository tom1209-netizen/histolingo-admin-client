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
import { forgetPassword } from "../../api/auth";
import LanguageSelect from "../../components/layouts/LanguageSelect";
import { useTranslation } from "react-i18next";

interface FormValues {
  email: string;
}

export default function ForgetPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await forgetPassword(data.email);
      if (response.status === 200) {
        alert('Password reset instructions sent to your email.');
      } else {
        alert('Failed to send password reset instructions. Please try again.');
      }
    } catch (error) {
      console.error("Failed to send password reset instructions", error);
      alert("Failed to send password reset instructions. Please try again.");
    }
  };
  
  const handleBackToLogin = () => {
    navigate("/login");
  };

  const { t } = useTranslation();

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
           <Box sx={{position: "absolute", top: 16, right: 20}}>
              <LanguageSelect />
            </Box>
          <Typography component="h1" variant="h5">
          {t("forgetPassword.title")}
          </Typography>
          <Typography component="h2">
          {t("forgetPassword.instruction")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <EmailInputField control={control} errors={errors} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            {t("forgetPassword.sendLink")}
            </Button>
            <Button
              onClick={handleBackToLogin}
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
            >
               {t("forgetPassword.backToLogin")}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
