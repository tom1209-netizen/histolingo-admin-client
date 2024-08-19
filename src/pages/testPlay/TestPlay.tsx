import React, {
    useEffect,
    useState
} from 'react';
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
import { getIndividualTest } from "../../api/test"

const colors = ['lightgreen', 'lightblue', 'lightcoral', 'lightpink', 'lightgoldenrodyellow'];

function TrueFalseQuestion({ questionsData }) {
    return (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h5">{questionsData.ask}</Typography>
            <Typography variant="h5">True/False Question</Typography>
            <RadioGroup>
                <FormControlLabel value="true" control={<Radio />} label="True" />
                <FormControlLabel value="false" control={<Radio />} label="False" />
            </RadioGroup>
        </Paper>
    );
}

function MultipleChoiceQuestion({ questionsData }) {
    return (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h5">{questionsData.ask}</Typography>
            <Typography variant="h5">Multiple Choice Question</Typography>
            <RadioGroup>
                {
                    questionsData.options.map((option, index) => (
                        <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
                    ))
                }
            </RadioGroup>
        </Paper>
    );
}

function FillInTheBlankQuestion({ questionsData }) {
    return (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h5">{questionsData.ask}</Typography>
            <Typography variant="h5">Fill In The Blank Question</Typography>
            <TextField
                fullWidth
                label="Your Answer"
                variant="outlined"
                sx={{ marginTop: 2 }}
            />
        </Paper>
    );
}

function MatchingQuestion({ questionsData }) {
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectedDefinition, setSelectedDefinition] = useState(null);
    const [matches, setMatches] = useState([]);

    const rightColumn = questionsData['answer'].map(item => item['rightColumn']);
    const leftColumn = questionsData['answer'].map(item => item['leftColumn']);

    const handleSelectTerm = (term) => {
        setSelectedTerm(term);
    };

    const handleSelectDefinition = (definition) => {
        setSelectedDefinition(definition);
    };

    const handleMatch = () => {
        if (selectedTerm && selectedDefinition) {
            const color = colors[matches.length % colors.length]; // Rotate through colors
            setMatches([...matches, { term: selectedTerm, definition: selectedDefinition, color }]);
            setSelectedTerm(null);
            setSelectedDefinition(null);
        }
    };

    const getTermColor = (term) => {
        const match = matches.find(match => match.term === term);
        return match ? match.color : null;
    };

    const getDefinitionColor = (definition) => {
        const match = matches.find(match => match.definition === definition);
        return match ? match.color : null;
    };

    return (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Container sx={{ marginTop: 4 }}>
                <Typography variant="h5">{questionsData.ask}</Typography>
                <Typography variant="h5" gutterBottom>Matching Question</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6">Left Column</Typography>
                        {leftColumn.map((item, index) => (
                            <Paper
                                key={index}
                                sx={{
                                    padding: 2,
                                    marginBottom: 2,
                                    cursor: 'pointer',
                                    backgroundColor: getTermColor(item) || (selectedTerm === item ? 'lightgray' : 'white')
                                }}
                                onClick={() => handleSelectTerm(item)}
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
                                    cursor: 'pointer',
                                    backgroundColor: getDefinitionColor(item) || (selectedDefinition === item ? 'lightgray' : 'white')
                                }}
                                onClick={() => handleSelectDefinition(item)}
                            >
                                {item}
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
                <Box sx={{ marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleMatch} disabled={!selectedTerm || !selectedDefinition}>
                        Match
                    </Button>
                </Box>
            </Container>
        </Paper>
    );
}

function TestPlay(props: any) {
    const [test, setTest] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const questionsList = test['questionsId'];
    const dummyId = '66c09a692c5f7b45260f8006';

    useEffect(async () => {
        const data = await getIndividualTest(dummyId);
        setTest(data['data']['data']['test']);
        setLoading(false)
    }, [dummyId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container sx={{ marginTop: 4 }}>
            <Typography variant="h4" gutterBottom>Test Play Page</Typography>
            <Grid container spacing={2}>
                {
                    questionsList.map((question, index) => (
                        <Grid item xs={12} key={index}>
                            {question.questionType === 1 && <TrueFalseQuestion questionsData={question}/>}
                            {question.questionType === 0 && <MultipleChoiceQuestion questionsData={question}/>}
                            {question.questionType === 3 && <FillInTheBlankQuestion questionsData={question}/>}
                            {question.questionType === 2 && <MatchingQuestion questionsData={question}/>}
                        </Grid>
                    ))
                }
            </Grid>
            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary">Previous</Button>
                <Button variant="contained" color="primary">Next</Button>
            </Box>
        </Container>
    );
}

export default TestPlay;