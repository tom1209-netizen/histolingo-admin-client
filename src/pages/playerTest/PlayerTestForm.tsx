import {
  CssBaseline,
  Grid,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCountries } from "../../api/country";
import { getTopicsByCountry } from "../../api/topic";
import SelectInputField from "../../components/formComponents/SelectInputField";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import { FormGrid } from "../../constant/FormGrid";
import { FormValues } from "../../interfaces/question.interface";
import { TestFormProps } from "../../interfaces/test.interface";
import theme from "../../theme/GlobalCustomTheme";
import DataTable from "../../components/reusable/Table";
import {
  GridColDef,
  GridPaginationModel,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { getQuestions } from "../../api/question";
import { formatTimestamp } from "../../utils/formatTime";
import LocaleTextInputField from "../../components/localeComponents/LocaleTextInputField";
import { languageOptions } from "../../constant/languageOptions";
import { auto } from "@popperjs/core";

const PlayerTestForm: React.FC<TestFormProps> = ({ typeOfForm, testData }) => {
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
      localeData: {
        "en-US": { name: "" },
      },
    },
  });

  const navigate = useNavigate();
  const country = watch("country");
  const activeCompulsory = typeOfForm === "create";
  const [loading, setLoading] = useState<boolean>(true);
  const [countryNames, setCountryNames] = useState<any[]>([]);
  const [topicNames, setTopicNames] = useState<any[]>([]);
  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const language = watch("language");

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("language", value);
  };

  const handleSelectionChange = (rowSelectionModel: GridRowSelectionModel) => {
    console.log(rowSelectionModel, "rowSelectionModel");
    setSelectedRows(rowSelectionModel);
  };

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

  // HANDLE TOPIC CHANGE
  const handleTopicChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("topic", value);
  };

  // TABLE DATA
  const [searchParams, setSearchParams] = useSearchParams();
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
        // ...searchQuestionQuery,
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
    // console.log(data);
    // console.log(selectedRows, "selectedRows");
    const status = data.status === "active" ? 1 : 0;
    const body = {
      topicId: data.topic,
      countryId: data.country,
      questionNumber: selectedRows.length,
      status: status,
      questions: selectedRows,
    };
    console.log(body, "body");
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
            name={"Country name"}
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

        <FormGrid item xs={12} md={12}>
          <FormLabel htmlFor="question-select" required style={{marginBottom: '1rem'}}>
            Select questions
          </FormLabel>
          <DataTable
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
            buttonName={typeOfForm === "create" ? "Create" : "Update"}
          />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default PlayerTestForm;
