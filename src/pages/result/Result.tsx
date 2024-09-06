import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Result() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { correctAnswersCount, totalQuestions, timeTaken } = location.state || {
    correctAnswersCount: 0,
    totalQuestions: 0,
    timeTaken: 0,
  };

  const handleRetakeTest = () => {
    navigate("/testplay");
  };

  const handleGoBack = () => {
    navigate("/playertest");
  };

  const convertTime = (timeTaken: number) => {
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    return `${minutes}:${seconds}`;
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Paper sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          {t("testResult.testResult")}
        </Typography>
        <Typography variant="h6">
          {t("testResult.youAnswered")} {correctAnswersCount} / {totalQuestions}{" "}
          {t("testResult.correct")}
        </Typography>
        <Typography variant="h6">
          {t("testResult.time")} {convertTime(timeTaken)}
        </Typography>
        <Box sx={{ marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRetakeTest}
          >
            {t("testResult.retake")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginLeft: 2 }}
            onClick={handleGoBack}
          >
            {t("testResult.back")}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Result;
