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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import EmailInputField from "../../components/formComponents/EmailInputField";
import PasswordInputField from "../../components/formComponents/PasswordInputField";
import Copyright from "../../components/reusable/Copyright";
import LanguageSelect from "../../components/layouts/LanguageSelect";
import { login } from "../../api/auth";
import { set } from "mongoose";
import { CircularProgress } from "@mui/material";

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const [customError, setCustomError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const response = await login(data.email, data.password);
      console.log(response.data, "in result");
      if (response.data.success) {
        document.cookie = `accessToken=${response.data.data.accessToken};path=/`;
        document.cookie = `refreshToken=${response.data.data.refreshToken};path=/`;
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      if (error.status === 401) {
        setCustomError(t("login.validation.invalid"));
      } else if (error.status === 404) {
        setCustomError(t("login.validation.inactive"));
      } else {
        setCustomError(t("login.validation.unexpectedError"));
      }
      setLoading(false);
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
          <Box sx={{ position: "absolute", top: 16, right: 20 }}>
            <LanguageSelect />
          </Box>
          <Typography component="h2" variant="h6">
            {t("login.welcome")}
          </Typography>
          <Typography component="h1" variant="h5">
            {t("login.logIn")}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <EmailInputField control={control} errors={errors} />
            <PasswordInputField control={control} errors={errors} />
            {customError && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {customError}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {t("login.logIn")}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgetpassword" variant="body2">
                  {t("login.forgotPassword")}
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
