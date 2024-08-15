import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Grid, CssBaseline, ThemeProvider, TextField } from "@mui/material";
import theme from "../../theme/GlobalCustomTheme";
import FormLabel from "@mui/material/FormLabel";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import SelectInputField from "../../components/formComponents/SelectInputField";
import { SelectChangeEvent } from "@mui/material";
import ErrorSummary from "../../components/formComponents/ErrorSummary";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { getCountries } from "../../api/country";
import { useNavigate } from "react-router-dom";
import { languageOptions } from "../../constant/languageOptions";
import { FormGrid } from "../../constant/FormGrid";
import { getTopicsByCountry } from "../../api/topic";
import { questionTypes } from "../../constant/questionTypes";
import TrueFalseInputField from "../../components/questionComponents/TrueFalseInputField";
import MultipleChoiceText from "../../components/questionComponents/MultipleChoiceText";
import MultipleChoiceAnswer from "../../components/questionComponents/MultipleChoiceAnswer";
import {
  QuestionFormProps,
  FormValues,
  TrueFalseFormValues,
  FillInTheBlankFormValues,
  MatchingFormValues,
  MultipleChoiceFormValues,
} from "../../interfaces/question.interface";

const QuestionForm: React.FC<QuestionFormProps> = ({
  typeOfForm,
  questionData,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      language: "en-US",
      localeData: {
        "en-US": { name: "", description: "" },
        "ja-JP": { name: "", description: "" },
        "vi-VN": { name: "", description: "" },
      },
    },
  });

  const navigate = useNavigate();
  const language = watch("language");
  const country = watch("country");
  const questionType = watch("question-type");
  const activeCompulsory = typeOfForm === "create";

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [countryNames, setCountryNames] = useState<any[]>([]);
  const [topicNames, setTopicNames] = useState<any[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const query = { status: 1 };
        const response = await getCountries();
        const countries = response.data.data.countries;
        console.log(countries);
        const countryNames = countries.map((country: any) => ({
          value: country._id,
          label: country.name,
        }));
        setCountryNames(countryNames);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch countries");
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("country", value);
    try {
      const topics = await getTopicsByCountry(value);
      console.log(topics, "filtered topics");
      const topicNames = topics.map((topic: any) => ({
        value: topic._id,
        label: topic.name,
      }));
      setTopicNames(topicNames);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch topics");
    }
  };

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("language", value);
    setSelectedLanguage(value);
  };

  const handleTopicChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("topic", value);
  };

  const handleQuestionTypeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("question-type", value);
  };

  const handleTrueFalseChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("answer", value === "true");
  };

  const handleMultipleChoiceAnswerChange = (
    event: SelectChangeEvent<string>
  ) => {
    const value = event.target.value;
    setValue("answer", value);
  };

  const onSubmit = async (data: FormValues) => {
    const body = {
      name: data.localeData["en-US"].name,
      description: data.localeData["en-US"].description,
      localeData: data.localeData,
    };
    console.log("Question form submitted with data:", body);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>{typeOfForm === "create" ? "Create a" : "Update"} question</h1>
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="country-select" required>
            Country
          </FormLabel>
          <SelectInputField
            control={control}
            errors={errors}
            name="country"
            label="Country"
            options={countryNames}
            onChange={handleCountryChange}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="topic-select" required>
            Topic
          </FormLabel>
          <SelectInputField
            control={control}
            errors={errors}
            name="topic"
            label="topic"
            options={topicNames}
            onChange={handleTopicChange}
            disabled={!country}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="question-select" required>
            Question type
          </FormLabel>
          <SelectInputField
            control={control}
            errors={errors}
            name="question-type"
            label="Question type"
            options={questionTypes}
            onChange={handleQuestionTypeChange}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="language-select" required>
            Language
          </FormLabel>
          <SelectInputField
            control={control}
            errors={errors}
            name="language"
            label="Language"
            options={languageOptions}
            onChange={handleLanguageChange}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="ask" required>
            Question
          </FormLabel>
          <Controller
            name={`localeData[${language}].ask`}
            key={`localeData[${language}].ask`}
            control={control}
            rules={{
              required: `Question is required`,
              maxLength: {
                value: 500,
                message: `Question must be less than 500 characters`,
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={`Enter question`}
                multiline
                variant="outlined"
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 50 }}
                error={!!errors.localeData?.[language]?.ask}
                helperText={errors.localeData?.[language]?.description?.ask}
              />
            )}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="status" required>
            Status
          </FormLabel>
          <SelectStatusInputField
            control={control}
            errors={errors}
            activeCompulsory={activeCompulsory}
          />
        </FormGrid>

        {questionType === "1" && (
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="answer" required>
              True/False answer
            </FormLabel>
            <TrueFalseInputField
              control={control}
              errors={errors}
              onChange={handleTrueFalseChange}
            />
          </FormGrid>
        )}

        {questionType === "0" && (
          <>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="answer-text-A" required>
                Question A
              </FormLabel>
              <MultipleChoiceText
                name="answer-text-A"
                control={control}
                errors={errors}
              />
            </FormGrid>

            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="answer-text-B" required>
                Question B
              </FormLabel>
              <MultipleChoiceText
                name="answer-text-B"
                control={control}
                errors={errors}
              />
            </FormGrid>

            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="answer-text-C" required>
                Question C
              </FormLabel>
              <MultipleChoiceText
                name="answer-text-C"
                control={control}
                errors={errors}
              />
            </FormGrid>

            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="answer-text-D" required>
                Question D
              </FormLabel>
              <MultipleChoiceText
                name="answer-text-D"
                control={control}
                errors={errors}
              />
            </FormGrid>

            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="answer" required>
                Multiple Choice Answer
              </FormLabel>
              <MultipleChoiceAnswer
                control={control}
                errors={errors}
                onChange={handleMultipleChoiceAnswerChange}
              />
            </FormGrid>
            <FormGrid item xs={12} md={6}></FormGrid>
          </>
        )}

        <FormGrid item xs={12} md={6}>
          <Box>
            <ErrorSummary errors={errors} />
          </Box>
        </FormGrid>

        <FormGrid item xs={12} md={6}></FormGrid>

        <FormGrid item>
          <CreateButtonGroup
            buttonName={typeOfForm === "create" ? "Create" : "Update"}
          />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default QuestionForm;
