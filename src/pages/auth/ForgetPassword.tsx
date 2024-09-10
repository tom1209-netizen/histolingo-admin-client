import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { forgetPassword } from "../../api/auth";
import EmailInputField from "../../components/formComponents/EmailInputField";
import LanguageSelect from "../../components/layouts/LanguageSelect";
import Copyright from "../../components/reusable/Copyright";
import theme from "../../theme/GlobalCustomTheme";
import { set } from "mongoose";

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
  const { t } = useTranslation();
  const [state, setState] = React.useState<string | null>(null);
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await forgetPassword(data.email);
      if (response.status === 200) {
        setState(t("forgotPassword.result.success"));
      }
    } catch (error) {
      console.error("Failed to send password reset instructions", error);
      setState(t("forgotPassword.result.error"));
    }
  };

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
          <Box sx={{ position: "absolute", top: 16, right: 20 }}>
            <LanguageSelect />
          </Box>
          <Typography component="h1" variant="h5">
            {t("forgotPassword.title")}
          </Typography>
          <Typography component="h2">
            {t("forgotPassword.instruction")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <EmailInputField control={control} errors={errors} />
            {state && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {state}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              {t("forgotPassword.sendLink")}
            </Button>
            <Button
              onClick={handleBackToLogin}
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
            >
              {t("forgotPassword.backToLogin")}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
