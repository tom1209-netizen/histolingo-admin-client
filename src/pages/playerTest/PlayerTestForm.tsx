import {
  CssBaseline,
  Grid,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import {
  GridColDef,
  GridPaginationModel,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getCountries,
  getCountriesByPassAuthorization,
} from "../../api/country";
import {
  getDocumentationsByCountryAndTopic,
  getDocuments,
} from "../../api/documentation";
import { createPlayerTest, updatePlayerTest } from "../../api/playerTest";
import { getQuestions, getQuestionsByPassAuthorization } from "../../api/question";
import { getTopicsByCountry } from "../../api/topic";
import LocaleTextInputField from "../../components/formComponents/LocaleTextInputField";
import MultiSelect2 from "../../components/formComponents/MultiSelect2";
import SelectInputField from "../../components/formComponents/SelectInputField";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import { LoadingForm } from "../../components/reusable/Loading";
import SearchField from "../../components/reusable/SearchField";
import DataTable from "../../components/reusable/Table";
import {
  maximumQuestionsOnTest,
  minimumQuestionsOnTest,
} from "../../constant/common";
import { FormGrid } from "../../constant/FormGrid";
import { languageOptions } from "../../constant/languageOptions";
import { FormValues, TestFormProps } from "../../interfaces/test.interface";
import theme from "../../theme/GlobalCustomTheme";
import { convertSearchParamsToObj } from "../../utils/common";
import { formatTimestamp } from "../../utils/formatTime";

const defaultFormValues = {
  language: "en-US",
  localeData: {
    "en-US": { name: "" },
  },
};
const PlayerTestForm: React.FC<TestFormProps> = ({ typeOfForm, testData }) => {
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
    defaultValues: defaultFormValues,
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const localeData = watch("localeData");
  const country = watch("country");
  const topic = watch("topic");
  const activeCompulsory = typeOfForm === "create";
  const [loading, setLoading] = useState<boolean>(true);
  const [countryNames, setCountryNames] = useState<any[]>([]);
  const [topicNames, setTopicNames] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const language = watch("language");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [documentationArray, setDocumentationArray] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  // HANDLE LANGUAGE CHANGE
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedLanguage(value);
  };

  // HANDLE FILL DATA FOR UPDATE FORM
  useEffect(() => {
    const fetchData = async () => {
      if (typeOfForm === "update" && testData) {
        console.log("Updating form with testData:", testData);
        setSelectedRows(testData.questionsId.map((question) => question._id));
        reset({
          ...defaultFormValues,
          ...testData,
          country: testData.country,
          topic: testData.topic,
          documentationsId: testData.documentationsId.map((doc) => doc._id),
        });
      }
    };
    fetchData();
  }, [testData]);

  // HANDLE SELECTION CHANGE
  const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    setSelectedRows(rowSelectionModel);
  };

  // FETCH DOCUMENTATIONS
  useEffect(() => {
    const fetchDocumentations = async () => {
      try {
        const query = { status: 1 };

        const documentations = await getDocumentationsByCountryAndTopic(
          country,
          topic
        );
        const documentationArray = documentations.map((doc: any) => ({
          value: doc._id,
          label: doc.name,
        }));
        setDocumentationArray(documentationArray);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch documentations");
      }
    };
    if (country && topic) {
      fetchDocumentations();
    }
  }, [country, topic]);

  // FETCH COUNTRIES
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountriesByPassAuthorization();
        console.log(response, "response");
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
        const topics = await getTopicsByCountry(country);
        const topicNames = topics.map((topic: any) => ({
          value: topic._id,
          label: topic.name,
        }));
        console.log("hellooooo");
        console.log(topics, "topics");
        setTopicNames(topicNames);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch topics");
      }
    };

    if (country) {
      fetchTopics();
    }
  }, [country]);

  // HANDLE TOPIC CHANGE
  const handleTopicChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("topic", value);
  };

  // TABLE DATA
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuestionQuery = convertSearchParamsToObj(searchParams);
  const [questions, setQuestions] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const columns: GridColDef[] = [
    { field: "ask", headerName: t("question"), width: 250 },
    {
      field: "topicName",
      headerName: t("topic"),
      width: 180,
      valueGetter: (value, row) => {
        if (row.topicId) return row.topic.name;
        return "No topic";
      },
    },
    {
      field: "countryName",
      headerName: t("country"),
      width: 130,
      valueGetter: (value, row) => {
        if (row.countryId) return row.country.name;
        return "N/A";
      },
    },
    {
      field: "questionType",
      headerName: t("questionType"),
      width: 130,
      valueGetter: (value, row) => {
        switch (row.questionType) {
          case 0:
            return t("questionDashboard.mcq");
          case 1:
            return t("questionDashboard.tf");
          case 2:
            return t("questionDashboard.matching");
          case 3:
            return t("questionDashboard.fill");
          default:
            return "N/A";
        }
      },
    },
    { field: "createdAt", headerName: t("createdAt"), width: 130 },
    { field: "updatedAt", headerName: t("updatedAt"), width: 130 },
  ];

  // FETCH QUESTIONS IN TABLE
  const fetchQuestions = async (page: number, pageSize: number) => {
    setIsTableLoading(true);
    try {
      const response = await getQuestionsByPassAuthorization({
        ...searchQuestionQuery,
        status: 1,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });
      const questionsData = response.data.data.questions;
      const formattedQuestions = questionsData.map((question: any) => ({
        ...question,
        createdAt: formatTimestamp(question.createdAt),
        updatedAt: formatTimestamp(question.updatedAt),
      }));
      const totalRows = response.data.data.totalQuestions;
      setQuestions(formattedQuestions);
      setRowCount(totalRows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  // SUBMIT FORM
  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    const selectedQuestionCount = selectedRows.length;
    if (selectedQuestionCount < minimumQuestionsOnTest) {
      setSubmitting(false);
      toast.error(
        `${t("createTest.validation.selectMin")} ${minimumQuestionsOnTest} ${t(
          "createTest.validation.question"
        )}`
      );
      return;
    } else if (selectedQuestionCount > maximumQuestionsOnTest) {
      setSubmitting(false);
      toast.error(
        `${t("createTest.validation.selectMax")} ${maximumQuestionsOnTest} ${t(
          "createTest.validation.question"
        )}`
      );
      return;
    }

    const body = {
      topicId: data.topic,
      countryId: data.country,
      questionsId: selectedRows.map((row) => row.toString()),
      name: data.localeData["en-US"].name,
      localeData: data.localeData,
      status: 1,
      documentationsId: data.documentationsId,
    };
    console.log(body, "body");

    try {
      if (typeOfForm === "create") {
        const response = await createPlayerTest(body);
        console.log(response, "response");
        if (response.data.success) {
          toast.success(t("toast.createSuccess"));
          navigate("/playertest");
        } else {
          toast.error(t("toast.error"));
        }
      } else if (typeOfForm === "update" && testData) {
        body["status"] = data.status;
        const response = await updatePlayerTest(testData?.id || "", body);
        if (response.data.success) {
          toast.success(t("toast.updateSuccess"));
          navigate("/playertest");
        } else {
          toast.error(t("toast.error"));
        }
      }
    } catch (error) {
      console.error("Failed to submit test:", error);
      toast.error(t("toast.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingForm />;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>
        {typeOfForm === "create"
          ? t("createTest.createTest")
          : t("createTest.updateTest")}
      </h1>
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
          <FormLabel htmlFor="name" required>
            {t("createTest.inputFields.testName")}
          </FormLabel>
          <LocaleTextInputField
            property={"name"}
            multiline={false}
            errors={errors}
            control={control}
            language={language}
            label={t("createTest.inputFields.testName")}
            length={50}
            minRows={1}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="country-select" required>
            {t("country")}
          </FormLabel>
          <SelectInputField
            control={control}
            errors={errors}
            name="country"
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
            name="topic"
            label={t("topic")}
            options={topicNames}
            onChange={handleTopicChange}
            disabled={!country}
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

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="documentation">{t("documentation")}</FormLabel>
          <MultiSelect2
            control={control}
            errors={errors}
            required={false}
            name="documentationsId"
            options={documentationArray}
            disabled={!country || !topic}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <SearchField
            label="Search question"
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchQuestionQuery, search: value.trim() })
            }
          />
        </FormGrid>

        <FormGrid item xs={12} md={12}>
          <FormLabel
            htmlFor="question-select"
            required
            style={{ marginBottom: "1rem" }}
          >
            {t("createTest.inputFields.select")}
          </FormLabel>
          <DataTable
            selectedRows={selectedRows}
            checkboxSelection={true}
            isLoading={isTableLoading}
            columns={columns}
            rows={questions}
            getRowId={(row) => row._id}
            rowCount={rowCount}
            paginationModel={paginationModel}
            onPageChange={handlePageChange}
            onSelectionModelChange={handleSelectionChange}
          />
        </FormGrid>

        <FormGrid item>
          <CreateButtonGroup
            nagivateTo={"/playertest"}
            typeOfForm={typeOfForm}
            isLoading={submitting}
          />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default PlayerTestForm;
