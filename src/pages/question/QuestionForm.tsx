import {
  CssBaseline,
  Grid,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCountries } from "../../api/country";
import { getTopicsByCountry } from "../../api/topic";
import SelectInputField from "../../components/formComponents/SelectInputField";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import MultipleChoiceAnswer from "../../components/questionComponents/MCQSelectAnswer";
import TrueFalseInputField from "../../components/questionComponents/TrueFalseInputField";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import { FormGrid } from "../../constant/FormGrid";
import { languageOptions } from "../../constant/languageOptions";
import { questionTypes } from "../../constant/questionTypes";
import Button from "@mui/material/Button";
import {
  FormValues,
  QuestionFormProps,
} from "../../interfaces/question.interface";
import theme from "../../theme/GlobalCustomTheme";
import LocaleTextInputField from "../../components/localeComponents/LocaleTextInputField";
import MCQQuestionText from "../../components/questionComponents/MCQQuestionText";
import { auto } from "@popperjs/core";
import MatchingPair from "../../components/questionComponents/MatchingPair";

const QuestionForm: React.FC<QuestionFormProps> = ({
  typeOfForm,
  questionData,
}) => {
  // USE FORM
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
        "en-US": { ask: "", options: [] },
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "answer",
  });

  const navigate = useNavigate();
  const language = watch("language");
  const country = watch("country");
  const questionType = watch("questionType");
  const activeCompulsory = typeOfForm === "create";
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [countryNames, setCountryNames] = useState<any[]>([]);
  const [topicNames, setTopicNames] = useState<any[]>([]);

  // FETCH COUNTRIES
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

  // HANDLE COUNTRY CHANGE & FETCH TOPICS
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

  // HANDLE LANGUAGE CHANGE
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedLanguage(value);
  };

  // HANDLE TOPIC CHANGE
  const handleTopicChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("topic", value);
  };

  // QUESTION DATA HANDLING

  // HANDLE QUESTION TYPE CHANGE
  const handleQuestionTypeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("questionType", value);
    if (value === "2" && fields.length === 0) {
      append({ leftColumn: "", rightColumn: "" });
    }
  };

  // HANDLE TRUE/FALSE CHANGE
  const handleTrueFalseChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("answer", value === "true");
  };

  // HANDLE MULTIPLE CHOICE CHANGE
  const handleMultipleChoiceAnswerChange = (
    event: SelectChangeEvent<string>
  ) => {
    const value = event.target.value;
    setValue("answer", value);
  };

  // SUBMIT FORM
  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const status = data.status === "active" ? 1 : 0;
    const body = {
      countryId: data.country,
      topicId: data.topic,
      ask: data.localeData["en-US"].ask,
      questionType: Number(data.questionType),
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
            label="Topic"
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
            name="questionType"
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
          <LocaleTextInputField
            property={"ask"}
            language={language}
            name="ask"
            control={control}
            errors={errors}
            length={500}
            rowHeight={auto}
            multiline={true}
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
            <MCQQuestionText
              language={language}
              control={control}
              errors={errors}
            />
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
            <FormGrid item xs={12} md={6}>
              {" "}
            </FormGrid>
          </>
        )}

        {questionType === "2" && (
          <>
            {fields.map((item, index) => (
              <>
                <FormGrid item xs={12} md={12} key={item.id}>
                  <MatchingPair
                    index={index}
                    language={language}
                    control={control}
                    errors={errors}
                  />
                </FormGrid>
                <FormGrid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </Button>
                </FormGrid>
              </>
            ))}
            <FormGrid item>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() => append({ leftColumn: "", rightColumn: "" })}
              >
                Add Pair
              </Button>
            </FormGrid>
            <FormGrid item xs={12} md={12}></FormGrid>
          </>
        )}

        {questionType === "3" && (
          <>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="answer" required>
                Answer
              </FormLabel>
              <LocaleTextInputField
                property={"answer"}
                language={language}
                name="answer"
                control={control}
                errors={errors}
                length={500}
                rowHeight={auto}
                multiline={true}
              />
            </FormGrid>
            <FormGrid item xs={12} md={6}></FormGrid>
          </>
        )}

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
