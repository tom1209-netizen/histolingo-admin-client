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
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCountries } from "../../api/country";
import { getDocuments } from "../../api/documentation";
import { createPlayerTest, updatePlayerTest } from "../../api/playerTest";
import { getQuestions } from "../../api/question";
import { getTopicsByCountry } from "../../api/topic";
import MultiSelectInputField from "../../components/formComponents/MultiSelectInputField";
import SelectInputField from "../../components/formComponents/SelectInputField";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import LocaleTextInputField from "../../components/formComponents/LocaleTextInputField";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
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
import MultiSelect2 from "../../components/formComponents/MultiSelect2";
import { useTranslation } from "react-i18next";

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

  const {t} = useTranslation()

  const navigate = useNavigate();
  // const country = watch("country");
  const localeData = watch("localeData");
  const countryId = watch("countryId");
  const activeCompulsory = typeOfForm === "create";
  const [loading, setLoading] = useState<boolean>(true);
  const [countryNames, setCountryNames] = useState<any[]>([]);
  const [topicNames, setTopicNames] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const language = watch("language");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [documentationArray, setDocumentationArray] = useState<any[]>([]);
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
        setSelectedRows(testData.questionsId.map((question) => question._id))
        reset({
          ...defaultFormValues,
          ...testData,
          countryId: testData.countryId._id,
          topicId: testData.topicId._id,
          documentationsId: testData.documentationsId.map((doc) => doc._id),
        });

        // setValue("countryId", testData.countryId._id);
        // const documentNames = testData.documentationsId.map(
        //   (doc: any) => doc.name
        // );
        // setValue("documentationsId", documentNames);
        // const selectedRowIds: GridRowSelectionModel = testData.questionsId.map(
        //   (content: any) => content._id
        // );
        // console.log(selectedRowIds, "selectedRowIds");
        // setSelectedRows(selectedRowIds);

        // console.log(testData.localeData["en-US"].name, "name");

        // Object.keys(testData.localeData).forEach((locale) => {
        //   setValue(
        //     `localeData[${locale}].name`,
        //     testData.localeData[locale].name
        //   );
        // });
        // try {
        //   const topics = await getTopicsByCountry(testData.countryId._id);
        //   console.log(topics, "filtered topics");
        //   const topicNames = topics.map((topic: any) => ({
        //     value: topic._id,
        //     label: topic.name,
        //   }));
        //   setTopicNames(topicNames);
        //   setValue("topicId", testData.topicId._id);
        // } catch (error) {
        //   console.error(error);
        //   toast.error("Failed to fetch topics");
        // }
      }
    };

    fetchData();
  }, [testData, typeOfForm]);

  // HANDLE SELECTION CHANGE
  const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    setSelectedRows(rowSelectionModel);
  };

  // FETCH DOCUMENTATIONS

  useEffect(() => {
    const fetchDocumentations = async () => {
      try {
        const query = { status: 1 };
        const response = await getDocuments(query);
        const documentations = response.data.data.documentations;
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
    fetchDocumentations();
  }, []);

  // FETCH COUNTRIES
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const query = { status: 1 };
        const response = await getCountries(query);
        const countries = response.data.data.countries;
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
    { field: "ask", headerName: "Question", width: 250 },
    {
      field: "topicName",
      headerName: "Topic",
      width: 180,
      valueGetter: (value, row) => {
        if (row.topicId) return row.topicId.name;
        return "No topic";
      },
    },
    {
      field: "countryName",
      headerName: "Country",
      width: 130,
      valueGetter: (value, row) => {
        if (row.countryId) return row.countryId.name;
        return "No country";
      },
    },
    {
      field: "questionType",
      headerName: "Question Type",
      width: 130,
      valueGetter: (value, row) => {
        switch (row.questionType) {
          case 0:
            return "Multiple Choice";
          case 1:
            return "True/False";
          case 2:
            return "Matching";
          case 3:
            return "Fill in the blank";
          default:
            return "No question type";
        }
      },
    },
    { field: "createdAt", headerName: "Created At", width: 130 },
    { field: "updatedAt", headerName: "Updated At", width: 130 },
  ];

  const fetchQuestions = async (page: number, pageSize: number) => {
    setIsTableLoading(true);
    try {
      const response = await getQuestions({
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
    console.log(data, "form data")
    const status = data.status === "active" ? 1 : 0;

    const selectedQuestionCount = selectedRows.length;

    if (selectedQuestionCount < minimumQuestionsOnTest) {
      toast.error(
        `You must select at least ${minimumQuestionsOnTest} questions.`
      );
      return;
    } else if (selectedQuestionCount > maximumQuestionsOnTest) {
      toast.error(
        `You must select at most ${maximumQuestionsOnTest} questions.`
      );
      return;
    }


    const body = {
      topicId: data.topicId,
      countryId: data.countryId,
      questionsId: selectedRows.map((row) => row.toString()),
      name: data.localeData["en-US"].name,
      localeData: data.localeData,
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
      } else {
        // UPDATE TEST
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
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>{typeOfForm === "create" ? "Create a" : "Update"} test</h1>
      <Grid
        container
        spacing={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
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
          <FormLabel htmlFor="name" required>
            Test name
          </FormLabel>
          <LocaleTextInputField
            property={"name"}
            multiline={false}
            errors={errors}
            control={control}
            language={language}
            name={"Test name"}
            length={50}
            minRows={1}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="country-select" required>
            Country
          </FormLabel>
          <SelectInputField
            control={control}
            errors={errors}
            name="countryId"
            label="Country"
            options={countryNames}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="topic-select" required>
            Topic
          </FormLabel>
          <SelectInputField
            control={control}
            errors={errors}
            name="topicId"
            label="Topic"
            options={topicNames}
            onChange={handleTopicChange}
            disabled={!countryId}
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

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="documentation" required>
            Documentation
          </FormLabel>
          <MultiSelect2
            control={control}
            errors={errors}
            required={false}
            name="documentationsId"
            options={documentationArray}
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
            Select questions
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
          />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default PlayerTestForm;
