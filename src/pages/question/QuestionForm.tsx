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
import { getCountries, getCountriesByPassAuthorization } from "../../api/country";
import { createQuestion, updateQuestion } from "../../api/question";
import { getTopicsByCountry } from "../../api/topic";
import SelectInputField from "../../components/formComponents/SelectInputField";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import LocaleTextInputField from "../../components/formComponents/LocaleTextInputField";
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
import { useTranslation } from "react-i18next";
import { LoadingForm } from "../../components/reusable/Loading";
import { set } from "mongoose";

const defaultFormValues = {
  language: "en-US",
  localeData: {
    "en-US": { ask: "" },
  },
};

const QuestionForm: React.FC<QuestionFormProps> = ({
  typeOfForm,
  questionData,
}) => {
  // USE FORM
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<any>({
    mode: "onChange",
    defaultValues: defaultFormValues,
  });

  // USE FIELD ARRAY
  const { fields, append, remove } = useFieldArray({
    control,
    name: "answer",
  });

  // SET UP
  const navigate = useNavigate();
  const activeCompulsory = typeOfForm === "create";
  const { t } = useTranslation();
  const language = watch("language");
  const countryId = watch("countryId");
  const questionType = watch("questionType");
  const localeData = watch("localeData");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [countryNames, setCountryNames] = useState<any[]>([]);
  const [topicNames, setTopicNames] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // FETCH COUNTRIES
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountriesByPassAuthorization();
        const countries = response.data.data;
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

  // FETCH TOPICS
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topics = await getTopicsByCountry(countryId);
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
    if (countryId) {
      fetchTopics();
    }
  }, [countryId]);

  useEffect(() => {
    console.log("Current form values:", getValues());
  }, [countryId, questionType]);

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

  // HANDLE QUESTION TYPE CHANGE
  const handleQuestionTypeChange = (event: any) => {
    const value = event.target.value;
    console.log(value, "value");
    setValue("questionType", value);
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

  // FETCH QUESTION DATA IF UPDATE FORM
  useEffect(() => {
    const updateForm = async () => {
      try {
        if (typeOfForm === "update" && questionData) {
          console.log("Updating form with questionData:", questionData);
          // map data

          console.log("after", questionData);
          console.log("question type", questionData.questionType);

          if (questionData.questionType === 3) {
            for (const locale in questionData.localeData) {
              questionData.localeData[locale].answer =
                questionData.localeData[locale].answer.join("\n");
            }
          } else if (questionData.questionType === 1) {
            questionData[`answer-type-${questionData.questionType}`] =
              questionData.answer.toString();
          } else {
            questionData[`answer-type-${questionData.questionType}`] =
              questionData.answer;
          }

          reset({ ...defaultFormValues, ...questionData });
          setValue("questionTypeDisabled", questionData.questionType);
          
        }
      } catch (error) {
        console.error(error);
        toast("Fetching data");
      } finally {
        setLoading(false);
      }
    };

    updateForm();
  }, [questionData]);

  // SUBMIT FORM
  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    // CHECK IF ENGLISH FIELDS ARE FILLED
    if (data.questionType === 0) {
      console.log("is this called?");
      console.log(localeData["en-US"].options);
      const optionsFilledOrNot = localeData["en-US"].options.every((option) => {
        return option !== null && option !== undefined && option !== "";
      });
      if (!localeData["en-US"].ask.trim() || !optionsFilledOrNot) {
        toast.error(t("toast.enUS"));
        setSubmitting(false);
        return;
      }
    } else if (data.questionType === 1) {
      if (!localeData["en-US"].ask.trim()) {
        toast.error(t("toast.enUS"));
        setSubmitting(false);
        return;
      }
    } else if (data.questionType === 2) {
      console.log(localeData["en-US"].answer, "localeData en-US");
      if (!localeData["en-US"].answer) {
        toast.error(t("toast.atLeastOnePair"));
        setSubmitting(false);
        return;
      }
      const pairsFilledOrNot = localeData["en-US"].answer.every(
        (leftColumn, index) => {
          return (
            leftColumn !== null &&
            leftColumn !== undefined &&
            leftColumn !== "" &&
            localeData["en-US"].answer[index].rightColumn !== null &&
            localeData["en-US"].answer[index].rightColumn !== undefined &&
            localeData["en-US"].answer[index].rightColumn !== ""
          );
        }
      );
      if (!localeData["en-US"].ask.trim() || !pairsFilledOrNot) {
        toast.error(t("toast.enUS"));
        setSubmitting(false);
        return;
      }
    } else if (data.questionType === 3) {
      const filledOrNot =
        localeData["en-US"].answer !== null &&
        localeData["en-US"].answer !== undefined &&
        localeData["en-US"].answer !== "";
      if (!localeData["en-US"].ask.trim() || !filledOrNot) {
        toast.error(t("toast.enUS"));
        setSubmitting(false);
        return;
      }
    }

    let baseBody = {
      countryId: data.countryId,
      topicId: data.topicId,
      ask: data.localeData["en-US"].ask,
      questionType: Number(data.questionType),
      answer: data.answer,
      localeData: data.localeData,
    };

    if (Number(data.questionType) === 0) {
      baseBody["options"] = data.localeData["en-US"].options;
    }

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

    console.log(baseBody, "baseBody updated");

    try {
      if (typeOfForm === "create") {
        const response = await createQuestion(baseBody);
        console.log(response);
        if (response.data.success) {
          toast.success(t("toast.createSuccess"));
          navigate("/question");
        }
      } else if (typeOfForm === "update" && questionData) {
        baseBody["status"] = data.status;
        const response = await updateQuestion(questionData?.id, baseBody);
        if (response.data.success) {
          toast.success(t("toast.updateSuccess"));
          navigate("/question");
        } else {
          toast.error(t("toast.error"));
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(t("toast.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingForm />;
  }

  const handleAppendPair = (value: any) => {
    // add new pair to locale data
    for (const locale in localeData) {
      const oldAnswer = localeData[locale].answer ?? [];
      localeData[locale].answer = [...oldAnswer, value];
    }
    setValue("localeData", localeData);
    append(value);
  };

  const handleRemovePair = (index: number) => {
    for (const locale in localeData) {
      const oldAnswer = localeData[locale].answer ?? [];
      localeData[locale].answer = oldAnswer.filter(
        (item: any, i: any) => i !== index
      );
    }
    setValue("localeData", localeData);
    remove(index);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>
        {typeOfForm === "create"
          ? t("createQuestion.createQuestion")
          : t("createQuestion.updateQuestion")}
      </h1>
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {typeOfForm === "create" && (
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="question-select" required>
              {t("createQuestion.inputFields.questionType")}
            </FormLabel>
            <SelectInputField
              control={control}
              errors={errors}
              name="questionType"
              label={t("createQuestion.inputFields.questionType")}
              options={questionTypes}
              onChange={handleQuestionTypeChange}
            />
          </FormGrid>
        )}

        {typeOfForm === "update" && (
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="question-select" required>
              {t("createQuestion.inputFields.questionType")}
            </FormLabel>
            <SelectInputField
              control={control}
              errors={errors}
              name="questionTypeDisabled"
              label={t("createQuestion.inputFields.questionType")}
              options={questionTypes}
              disabled={true}
            />
          </FormGrid>
        )}

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="language-select" required>
            {t("language")}
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
            {t("country")}
          </FormLabel>
          <SelectInputField
            control={control}
            errors={errors}
            name="countryId"
            label={t("country")}
            options={countryNames}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="topic-select" required>
            {t("topic")}
          </FormLabel>
          <SelectInputField
            control={control}
            errors={errors}
            name="topicId"
            label={t("topic")}
            options={topicNames}
            onChange={handleTopicChange}
            disabled={!countryId}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="ask" required>
            {t("question")}
          </FormLabel>
          <LocaleTextInputField
            property={"ask"}
            language={language}
            label={t("question")}
            control={control}
            errors={errors}
            length={500}
            minRows={1}
            multiline={true}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="status" required>
            {t("status")}
          </FormLabel>
          <SelectStatusInputField
            control={control}
            errors={errors}
            activeCompulsory={activeCompulsory}
          />
        </FormGrid>

        {questionType === 0 && (
          <>
            <MCQQuestionText
              language={language}
              control={control}
              errors={errors}
            />
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="answer-type-0" required>
                {t("createQuestion.inputFields.correct")}
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

        {questionType === 1 && (
          <>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="answer-type-1" required>
                {t("createQuestion.inputFields.correct")}
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

        {questionType === 2 && (
          <>
            {fields.map((item, index) => (
              <React.Fragment key={item.id}>
                <FormGrid item xs={12} md={12}>
                  <MatchingPair
                    key={item.id}
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
                    onClick={() => handleRemovePair(index)}
                  >
                    {t("createQuestion.inputFields.deletePair")}
                  </Button>
                </FormGrid>
              </React.Fragment>
            ))}
            <FormGrid item>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={() =>
                  handleAppendPair({ leftColumn: "", rightColumn: "" })
                }
              >
                {t("createQuestion.inputFields.addPair")}
              </Button>
            </FormGrid>
            <FormGrid item xs={12} md={12}></FormGrid>
          </>
        )}

        {questionType === 3 && (
          <>
            <FormGrid item xs={12} md={6}>
              <FormLabel htmlFor="answer-type-3" required>
                {t("createQuestion.inputFields.correct")}
              </FormLabel>
              <LocaleTextInputField
                property={"answer"}
                language={language}
                label="Answer"
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
            nagivateTo={"/question"}
            typeOfForm={typeOfForm}
            isLoading={submitting}
          />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default QuestionForm;
