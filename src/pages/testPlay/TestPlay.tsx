import React, {
    useEffect,
    useState
} from 'react';
import axios, { AxiosPromise } from 'axios';
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

const initialTerms = [
    { id: 1, term: "Apple" },
    { id: 2, term: "Banana" },
    { id: 3, term: "Orange" },
];

const initialDefinitions = [
    { id: 1, definition: "A sweet red fruit" },
    { id: 2, definition: "A long yellow fruit" },
    { id: 3, definition: "A citrus fruit" },
];

const colors = ['lightgreen', 'lightblue', 'lightcoral', 'lightpink', 'lightgoldenrodyellow'];

function TrueFalseQuestion(props: any) {
    return (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h5">True/False Question</Typography>
            <RadioGroup>
                <FormControlLabel value="true" control={<Radio />} label="True" />
                <FormControlLabel value="false" control={<Radio />} label="False" />
            </RadioGroup>
        </Paper>
    );
}

function MultipleChoiceQuestion(props: any) {
    return (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h5">Multiple Choice Question</Typography>
            <RadioGroup>
                <FormControlLabel value="A" control={<Radio />} label="A" />
                <FormControlLabel value="B" control={<Radio />} label="B" />
                <FormControlLabel value="C" control={<Radio />} label="C" />
                <FormControlLabel value="D" control={<Radio />} label="D" />
            </RadioGroup>
        </Paper>
    );
}

function FillInTheBlankQuestion(props: any) {
    return (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
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

function MatchingQuestion(props: any) {
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectedDefinition, setSelectedDefinition] = useState(null);
    const [matches, setMatches] = useState([]);

    const handleSelectTerm = (term) => {
        setSelectedTerm(term);
    };

    const handleSelectDefinition = (definition) => {
        setSelectedDefinition(definition);
    };

    const handleMatch = () => {
        if (selectedTerm && selectedDefinition) {
            const color = colors[matches.length % colors.length]; // Rotate through colors
            setMatches([...matches, { termId: selectedTerm.id, definitionId: selectedDefinition.id, color}]);
            setSelectedTerm(null);
            setSelectedDefinition(null);
        }
    };

    const getTermColor = (termId) => {
        const match = matches.find(match => match.termId === termId);
        return match ? match.color : null;
    };

    const getDefinitionColor = (definitionId) => {
        const match = matches.find(match => match.definitionId === definitionId);
        return match ? match.color : null;
    };

    return (
        <Paper sx={{ padding: 2, marginBottom: 2 }}>
            <Container sx={{ marginTop: 4 }}>
                <Typography variant="h4" gutterBottom>Matching Question</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h6">Terms</Typography>
                        {initialTerms.map((term) => (
                            <Paper
                                key={term.id}
                                sx={{
                                    padding: 2,
                                    marginBottom: 2,
                                    cursor: 'pointer',
                                    backgroundColor: getTermColor(term.id) || (selectedTerm?.id === term.id ? 'lightgray' : 'white')
                                }}
                                onClick={() => handleSelectTerm(term)}
                            >
                                {term.term}
                            </Paper>
                        ))}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6">Definitions</Typography>
                        {initialDefinitions.map((definition) => (
                            <Paper
                                key={definition.id}
                                sx={{
                                    padding: 2,
                                    marginBottom: 2,
                                    cursor: 'pointer',
                                    backgroundColor: getDefinitionColor(definition.id) || (selectedDefinition?.id === definition.id ? 'lightgray' : 'white')
                                }}
                                onClick={() => handleSelectDefinition(definition)}
                            >
                                {definition.definition}
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
                <Box sx={{ marginTop: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleMatch} disabled={!selectedTerm || !selectedDefinition}>
                        Match
                    </Button>
                </Box>
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h6">Matches</Typography>
                    {matches.map((match, index) => {
                        const term = initialTerms.find(t => t.id === match.termId);
                        const definition = initialDefinitions.find(d => d.id === match.definitionId);
                        return (
                            <Typography key={index}>
                                {term.term} - {definition.definition}
                            </Typography>
                        );
                    })}
                </Box>
            </Container>
        </Paper>
    );
}

function TestPlay(props: any) {
    const [test, setTest] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const dummyId = '66c09a692c5f7b45260f8006';

    const getTest = async (): Promise<AxiosPromise<any>> => {
        try {
            const response = await axios.get(`http://localhost:5000/tests/${dummyId}`);
            console.log(response);
            setTest(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message || "Get test failed");
            } else {
                throw error;
            }
        }
    };

    useEffect(() => {
        getTest();
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
                <Grid item xs={12}>
                    <TrueFalseQuestion />
                </Grid>
                <Grid item xs={12}>
                    <MultipleChoiceQuestion />
                </Grid>
                <Grid item xs={12}>
                    <FillInTheBlankQuestion />
                </Grid>
                <Grid item xs={12}>
                    <MatchingQuestion />
                </Grid>
            </Grid>
            <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="primary">Previous</Button>
                <Button variant="contained" color="primary">Next</Button>
            </Box>
        </Container>
    );
}

export default TestPlay;