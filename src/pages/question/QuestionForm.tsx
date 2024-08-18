import {
  CssBaseline,
  Grid,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCountries } from "../../api/country";
import { getTopicsByCountry } from "../../api/topic";
import SelectInputField from "../../components/formComponents/SelectInputField";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import LocaleTextInputField from "../../components/localeComponents/LocaleTextInputField";
import MatchingPair from "../../components/questionComponents/matchingType/MatchingPair";
import MCQQuestionText from "../../components/questionComponents/mcqType/MCQQuestionText";
import MultipleChoiceAnswer from "../../components/questionComponents/mcqType/MCQSelectAnswer";
import TrueFalseInputField from "../../components/questionComponents/TrueFalseInputField";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import { FormGrid } from "../../constant/FormGrid";
import { languageOptions } from "../../constant/languageOptions";
import { questionTypes } from "../../constant/questionTypes";
import {
  FormValues,
  QuestionFormProps,
} from "../../interfaces/question.interface";
import theme from "../../theme/GlobalCustomTheme";
import { createQuestion } from "../../api/question";

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
    reset,
    watch,
  } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      language: "en-US",
      localeData: {
        "en-US": { ask: "" },
      },
    },
  });

  // USE FIELD ARRAY

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
        const response = await getCountries(query);
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

  // FETCH QUESTION DATA IF UPDATE FORM
  //   useEffect(() => {
  //     const updateForm = () => {
  //       try {
  //         if (typeOfForm === "update" && questionData) {
  //           console.log("Updating form with questionData:", questionData);
  //           const status = questionData.status === 1 ? "active" : "inactive";

  //           // Set basic values
  //           setValue("language", questionData.language);
  //           setValue("country", questionData.countryId);
  //           setValue("topic", questionData.topicId);
  //           setValue("status", status);
  //           setValue("localeData", questionData.localeData);
  //           setValue("questionType", questionData.questionType);

  //           // Handle questionType specific logic
  //           if (questionData.questionType === 2) {
  //             const matchingPairs = questionData.localeData["en-US"].answer;
  //             console.log("matchingPairs", matchingPairs);
  //             reset({ answer: matchingPairs });
  //           } else if (questionData.questionType === 3) {
  //             const answers = questionData.localeData["en-US"].answer;
  //             console.log("answers", answers);
  //             reset({ answer: answers });
  //           }

  //           // Set localized data for each locale
  //           Object.keys(questionData.localeData).forEach((locale) => {
  //             setValue(`localeData[${locale}].ask`, questionData.localeData[locale].ask);
  //             setValue(`localeData[${locale}].answer`, questionData.localeData[locale].answer);
  //           });
  //         } else {
  //           reset({ language: "en-US", localeData: { "en-US": { ask: "" } } });
  //         }
  //       } catch (error) {
  //         console.error(error);
  //         toast.error("Failed to fetch question data");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     updateForm();
  //   }, [questionData, typeOfForm, setValue, reset]);

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
      reset({
        language: "en-US",
        localeData: {
          "en-US": { ask: "" },
        },
        questionType: "2",
      });
      append({ leftColumn: "", rightColumn: "" });
    }
    reset({
      language: "en-US",
      localeData: {
        "en-US": { ask: "" },
      },
      questionType: value,
    });
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
    let baseBody = {
      countryId: data.country,
      topicId: data.topic,
      ask: data.localeData["en-US"].ask,
      questionType: Number(data.questionType),
    //   status: status,
      answer: data.answer,
      localeData: data.localeData,
    };

    if (Number(data.questionType) === 3) {
      baseBody.answer = data.localeData["en-US"].answer.split("\n");
      for (const [locale, localeEntry] of Object.entries(baseBody.localeData)) {
        const typedLocaleEntry = localeEntry as { answer: string | string[] };
        if (typeof typedLocaleEntry.answer === "string") {
          typedLocaleEntry.answer = typedLocaleEntry.answer.split("\n");
        }
      }
    }

    if (Number(data.questionType) === 2) {
      baseBody.answer = data.localeData["en-US"].answer;
    }

    try {
      const response = await createQuestion(baseBody);
      console.log(response);
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again.");
    }
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
          <FormLabel htmlFor="question-select" required>
            Question type (choose one only)
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
          <FormLabel htmlFor="ask" required>
            Question
          </FormLabel>
          <LocaleTextInputField
            property={"ask"}
            language={language}
            name="Question ask"
            control={control}
            errors={errors}
            length={500}
            minRows={1}
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

        {questionType === "0" && (
          <>
            <MCQQuestionText
              language={language}
              control={control}
              errors={errors}
            />
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="answer-type-0" required>
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

        {questionType === "1" && (
          <>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="answer-type-1" required>
                True/False answer
              </FormLabel>
              <TrueFalseInputField
                control={control}
                errors={errors}
                onChange={handleTrueFalseChange}
              />
            </FormGrid>
            <FormGrid item xs={12} md={6}></FormGrid>
          </>
        )}

        {questionType === "2" && (
          <>
            {fields.map((item, index) => (
              <React.Fragment key={item.id}>
                <FormGrid item xs={12} md={12}>
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
              </React.Fragment>
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
              <FormLabel htmlFor="answer-type-3" required>
                Answer
              </FormLabel>
              <LocaleTextInputField
                property={"answer"}
                language={language}
                name="Answer"
                control={control}
                errors={errors}
                length={500}
                minRows={5}
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
