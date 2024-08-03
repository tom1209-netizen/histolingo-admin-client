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
import PasswordConfirmationInputField from "../../components/formComponents/PasswordConfirmInputField";
import PasswordInputField from "../../components/formComponents/PasswordInputField";
import { useTranslation } from "react-i18next";
import LanguageSelect from "../../components/layouts/LanguageSelect";
import { resetPassword } from "../../api/auth";
interface FormValues {
  password: string;
  passwordConfirmation: string;
}

export default function ResetPassword() {
  const {t} = useTranslation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>({ mode: "onChange" });

  const onSubmit = async (data: FormValues) => {
    try {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const token: any = urlParams.get('token')
      const userId: any = urlParams.get('id')
      const response = await resetPassword(data.password, data.passwordConfirmation, token, userId);
      if (response.status === 200) {
        alert("Password reset successfully.");
        navigate("/login");
      } else {
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
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
          <Box sx={{position: "absolute", top: 16, right: 20}}>
              <LanguageSelect />
            </Box>
          <Typography component="h1" variant="h5">
            {t("resetPassword.title")}
          </Typography>
          <Typography component="h2">{t("resetPassword.instruction")}</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <PasswordInputField control={control} errors={errors} />
            <PasswordConfirmationInputField
              control={control}
              errors={errors}
              passwordValue={getValues("password")}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            {t("resetPassword.resetPassword")}
            </Button>
            <Button
              onClick={handleBackToLogin}
              type="button"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
            >
              {t("resetPassword.backToLogin")}
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
