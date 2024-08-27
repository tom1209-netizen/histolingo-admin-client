import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Result() {
    const navigate = useNavigate();
    const location = useLocation();
    const { correctAnswersCount, totalQuestions, timeTaken } = location.state || { correctAnswersCount: 0, totalQuestions: 0, timeTaken: 0 };

    const handleRetakeTest = () => {
        navigate('/testplay');
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <Paper sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Test Results
                </Typography>
                <Typography variant="h6">
                    You answered {correctAnswersCount} out of {totalQuestions} questions correctly.
                </Typography>
                <Typography variant="h6">
                    Time taken: {timeTaken} seconds
                </Typography>
                <Box sx={{ marginTop: 4 }}>
                    <Button variant="contained" color="primary" onClick={handleRetakeTest}>
                        Retake Test
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}

export default Result;