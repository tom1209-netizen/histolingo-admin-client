import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
    CircularProgress,
    Grid,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField
} from '@mui/material';

import { getIndividualTest, startTest, checkAnswer } from "../../api/test";
import { styled, keyframes } from '@mui/system';
import correctAudio from '../../assets/audio/correct.mp3';
import wrongAudio from '../../assets/audio/wrong.mp3';
import { useNavigate } from 'react-router-dom';

const colors = [
    '#f48fb1',
    '#e1bee7',
    '#b39ddb',
    '#9fa8da',
    '#90caf9',
    '#80cbc4',
    '#81d4fa',
    '#80deea',
    '#c5e1a5'
];

// Define keyframes for the animations
const shake = keyframes`
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
`;

const expand = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
`;

// Custom styled Paper component with conditional animations
const AnimatedPaper = styled(Paper)(({ isCorrect }) => ({
    padding: '16px',
    marginBottom: '16px',
    border: isCorrect === null
        ? 'none'
        : isCorrect
            ? '2px solid green'
            : '2px solid red',
    animation: isCorrect === null
        ? 'none'
        : isCorrect
            ? `${expand} 0.3s ease-out forwards`
            : `${shake} 0.3s ease-out`
}));

function TrueFalseQuestion({ questionsData, onAnswerChange, selectedAnswer, disabled, isCorrect }) {
    return (
        <AnimatedPaper isCorrect={isCorrect}>
            <Typography variant="h5">{questionsData.ask}</Typography>
            <RadioGroup onChange={(e) => onAnswerChange(e.target.value)} value={selectedAnswer}>
                <FormControlLabel value="true" control={<Radio disabled={disabled} />} label="True" />
                <FormControlLabel value="false" control={<Radio disabled={disabled} />} label="False" />
            </RadioGroup>
        </AnimatedPaper>
    );
}

function MultipleChoiceQuestion({ questionsData, onAnswerChange, selectedAnswer, disabled, isCorrect }) {
    return (
        <AnimatedPaper isCorrect={isCorrect}>
            <Typography variant="h5">{questionsData.ask}</Typography>
            <RadioGroup onChange={(e) => onAnswerChange(e.target.value)} value={selectedAnswer}>
                {
                    questionsData.options.map((option, index) => (
                        <FormControlLabel key={index} value={index} control={<Radio disabled={disabled} />} label={option} />
                    ))
                }
            </RadioGroup>
        </AnimatedPaper>
    );
}

function FillInTheBlankQuestion({ questionsData, onAnswerChange, selectedAnswer, disabled, isCorrect }) {
    const [fillInAnswer, setFillInAnswer] = useState(selectedAnswer || []);
    const count = (questionsData['ask'].match(/___/g) || []).length;

    const handleChange = (value, index) => {
        const updatedAnswers = [...fillInAnswer.slice(0, index), value, ...fillInAnswer.slice(index + 1)];
        setFillInAnswer(updatedAnswers);
        onAnswerChange(updatedAnswers);
    };

    const textFields = [];
    for (let i = 0; i < count; i++) {
        textFields.push(
            <TextField
                key={i}
                fullWidth
                label={`Answer ${i + 1}`}
                variant="outlined"
                sx={{ marginTop: 2 }}
                onChange={(e) => handleChange(e.target.value, i)}
                value={fillInAnswer[i] || ''}
                disabled={disabled}
            />
        );
    }

    return (
        <AnimatedPaper isCorrect={isCorrect}>
            <Typography variant="h5">{questionsData.ask}</Typography>
            {textFields}
        </AnimatedPaper>
    );
}

function MatchingQuestion({ questionsData, onAnswerChange, selectedAnswer, disabled, isCorrect }) {
    const [selectedLeftColumn, setSelectedLeftColumn] = useState(null);
    const [selectedRightColumn, setSelectedRightColumn] = useState(null);
    const [matches, setMatches] = useState(selectedAnswer || []);
    const [matchColors, setMatchColors] = useState({});

    const rightColumn = questionsData['answer'].map(item => item['rightColumn']);
    const leftColumn = questionsData['answer'].map(item => item['leftColumn']);

    const handleSelectLeftColumn = (left) => {
        setSelectedLeftColumn(left);
        if (selectedRightColumn) {
            handleMatch(left, selectedRightColumn);
        }
    };

    const handleSelectRightColumn = (right) => {
        setSelectedRightColumn(right);
        if (selectedLeftColumn) {
            handleMatch(selectedLeftColumn, right);
        }
    };

    const handleMatch = (left, right) => {
        const newMatch = {
            "leftColumn": left,
            "rightColumn": right
        };

        const newMatches = [...matches, newMatch];
        setMatches(newMatches);

        const color = colors[newMatches.length % colors.length];
        setMatchColors(prevColors => ({
            ...prevColors,
            [left]: color,
            [right]: color,
        }));

        setSelectedLeftColumn(null);
        setSelectedRightColumn(null);
        onAnswerChange(newMatches);
    };

    const getLeftColumnColor = (left) => {
        return matchColors[left] || (selectedLeftColumn === left ? 'lightgray' : null);
    };

    const getRightColumnColor = (right) => {
        return matchColors[right] || (selectedRightColumn === right ? 'lightgray' : null);
    };

    const isLeftColumnDisabled = (left) => {
        return matches.some(match => match.leftColumn === left);
    };

    const isRightColumnDisabled = (right) => {
        return matches.some(match => match.rightColumn === right);
    };

    return (
        <AnimatedPaper isCorrect={isCorrect}>
            <Container sx={{ marginTop: 4 }}>
                <Typography variant="h5">{questionsData.ask}</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6">Left Column</Typography>
                        {leftColumn.map((item, index) => (
                            <Paper
                                key={index}
                                sx={{
                                    padding: 2,
                                    marginBottom: 2,
                                    cursor: (disabled || isLeftColumnDisabled(item)) ? 'default' : 'pointer',
                                    backgroundColor: getLeftColumnColor(item) || 'white'
                                }}
                                onClick={() => !disabled && !isLeftColumnDisabled(item) && handleSelectLeftColumn(item)}
                            >
                                {item}
                            </Paper>
                        ))}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Right Column</Typography>
                        {rightColumn.map((item, index) => (
                            <Paper
                                key={index}
                                sx={{
                                    padding: 2,
                                    marginBottom: 2,
                                    cursor: (disabled || isRightColumnDisabled(item)) ? 'default' : 'pointer',
                                    backgroundColor: getRightColumnColor(item) || 'white'
                                }}
                                onClick={() => !disabled && !isRightColumnDisabled(item) && handleSelectRightColumn(item)}
                            >
                                {item}
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </AnimatedPaper>
    );
}

function TestPlay(props: any) {
    const [questionsList, setQuestionsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedAnswers, setSubmittedAnswers] = useState({});
    const [isCorrect, setIsCorrect] = useState(null);
    const [testResultId, setTestResultId] = useState('');
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [endTime, setEndTime] = useState<Date | null>(null);
    const navigate = useNavigate();

    // FIXME: Dummy test ID for testing purposes
    const dummyId = '66c09a692c5f7b45260f8006';

    useEffect(() => {
        const startTestSession = async () => {
            const body = {
                "testId": dummyId
            }

            try {
                const data = await startTest(body);
                setQuestionsList(data['data']['data']['questions'])
                setTestResultId(data['data']['data']['testResultId']);
                setStartTime(new Date());
            } catch (error) {
                console.error('Error starting test session:', error);
            } finally {
                setLoading(false);
            }
        };

        startTestSession();
    }, [dummyId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const currentQuestion = questionsList[currentQuestionIndex];

    const handleNext = () => {
        if (currentQuestionIndex < questionsList.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            const nextQuestionId = questionsList[currentQuestionIndex + 1]._id;
            setSelectedAnswer(submittedAnswers[nextQuestionId]?.answer || null);
            setIsSubmitted(!!submittedAnswers[nextQuestionId]);
            setIsCorrect(submittedAnswers[nextQuestionId]?.isCorrect ?? null);
        } else {
            setEndTime(new Date());
            const timeTaken = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
            const correctAnswersCount = Object.values(submittedAnswers).filter(answer => answer.isCorrect).length;
            navigate('/result', { state: { correctAnswersCount, totalQuestions: questionsList.length, timeTaken } });
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            const prevQuestionId = questionsList[currentQuestionIndex - 1]._id;
            setSelectedAnswer(submittedAnswers[prevQuestionId]?.answer || null);
            setIsSubmitted(!!submittedAnswers[prevQuestionId]);
            setIsCorrect(submittedAnswers[prevQuestionId]?.isCorrect ?? null);
        }
    };

    const handleAnswerChange = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleSubmit = async () => {

        // Format the answer based on the question type
        const convertAnswer = (answer) => {
            if (!isNaN(answer) && typeof answer !== 'boolean') return parseInt(answer, 10);
            return answer === 'true' ? 1 : answer === 'false' ? 0 : answer;
        };

        const body = {
            testResultId: testResultId,
            questionId: currentQuestion._id,
            playerAnswer: convertAnswer(selectedAnswer)
        }

        try {
            console.log(body['playerAnswer']);
            const data = await checkAnswer(body);
            const isCorrect = data['data']['data']['isCorrect'];

            setIsSubmitted(true);
            setIsCorrect(isCorrect);

            const sound = new Audio(isCorrect ? correctAudio : wrongAudio);
            await sound.play();

            setSubmittedAnswers(prev => ({
                ...prev,
                [currentQuestion._id]: {
                    answer: selectedAnswer,
                    isCorrect: isCorrect
                }
            }));
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    return (
        <Container sx={{ marginTop: 4 }}>
            <h1>Test Play</h1>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {currentQuestion.questionType === 1 && (
                        <TrueFalseQuestion
                            questionsData={currentQuestion}
                            onAnswerChange={handleAnswerChange}
                            selectedAnswer={selectedAnswer}
                            disabled={isSubmitted}
                            isCorrect={isCorrect}
                        />
                    )}
                    {currentQuestion.questionType === 0 && (
                        <MultipleChoiceQuestion
                            questionsData={currentQuestion}
                            onAnswerChange={handleAnswerChange}
                            selectedAnswer={selectedAnswer}
                            disabled={isSubmitted}
                            isCorrect={isCorrect}
                        />
                    )}
                    {currentQuestion.questionType === 3 && (
                        <FillInTheBlankQuestion
                            questionsData={currentQuestion}
                            onAnswerChange={handleAnswerChange}
                            selectedAnswer={selectedAnswer}
                            disabled={isSubmitted}
                            isCorrect={isCorrect}
                        />
                    )}
                    {currentQuestion.questionType === 2 && (
                        <MatchingQuestion
                            questionsData={currentQuestion}
                            onAnswerChange={handleAnswerChange}
                            selectedAnswer={selectedAnswer}
                            disabled={isSubmitted}
                            isCorrect={isCorrect}
                        />
                    )}
                </Grid>
            </Grid>

            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
                    Previous
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isSubmitted || !selectedAnswer}>
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={!isSubmitted || currentQuestionIndex >= questionsList.length}>
                    Next
                </Button>
            </Box>
        </Container>
    );
}

export default TestPlay;