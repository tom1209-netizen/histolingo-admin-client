import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/GlobalCustomTheme.tsx";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import en from "./translations/en.ts";
import vi from "./translations/vi.ts"

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      translation: en
    },
    vi: {
      translation: vi
    }
  } 
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18next}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </I18nextProvider>
);
