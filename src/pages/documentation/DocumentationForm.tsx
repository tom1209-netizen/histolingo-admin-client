import {
  CssBaseline,
  Grid,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import { auto } from "@popperjs/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCountries } from "../../api/country";
import { getTopicsByCountry } from "../../api/topic";
import SelectInputField from "../../components/formComponents/SelectInputField";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import LocaleTextInputField from "../../components/localeComponents/LocaleTextInputField";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import { FormGrid } from "../../constant/FormGrid";
import { languageOptions } from "../../constant/languageOptions";
import {
  DocumentationFormProps,
  FormValues,
} from "../../interfaces/documentaion.interface";
import theme from "../../theme/GlobalCustomTheme";
import NonLocaleInputField from "../../components/formComponents/NonLocaleInputField";
import { createDocument, updateDocument } from "../../api/documentation";

const defaultFormValues = {
  language: "en-US",
  localeData: {
    "en-US": { name: "", content: "" },
  },
};
const DocumentationForm: React.FC<DocumentationFormProps> = ({
  typeOfForm,
  documentationData,
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
    defaultValues: defaultFormValues,
  });

  const navigate = useNavigate();
  const language = watch("language");
  const country = watch("country");
  const localeData = watch("localeData");
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

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topics = await getTopicsByCountry(country);
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

    if (country) {
      fetchTopics();
    }
  }, [country]);

  useEffect(() => {
    if (typeOfForm === "update" && documentationData) {
      console.log("Updating form with documentationData:", documentationData);
      reset({ ...defaultFormValues, ...documentationData });
    }
  }, [documentationData]);

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

  // SUBMIT FORM
  const onSubmit = async (data: FormValues) => {
    if (
      !localeData["en-US"].name.trim() ||
      !localeData["en-US"].content.trim()
    ) {
      toast.error(
        "Please fill in the name and description for English language."
      );
      return;
    }

    console.log(data);
    const status = data.status === "active" ? 1 : 0;
    const body = {
      countryId: data.country,
      topicId: data.topic,
      name: data.localeData["en-US"].name,
      content: data.localeData["en-US"].content,
      source: data.source,
      localeData: data.localeData,
    };
    console.log("Question form submitted with data:", body);

    try {
      if (typeOfForm === "create") {
        const response = await createDocument(body);
        if (response.data.success) {
          toast.success("Document created successfully.");
          navigate("/documentation");
        } else {
          console.log(response);
          toast.error("An error occurred. Please try again.");
        }
      } else if (typeOfForm === "update" && documentationData) {
        body["status"] = status;
        const response = await updateDocument(documentationData?.id, body);
        if (response.data.success) {
          toast.success("Document updated successfully.");
          navigate("/documentation");
        } else {
          console.log(response);
          toast.error("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error("Failed to submit question:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>{typeOfForm === "create" ? "Create a" : "Update"} document</h1>
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
            // onChange={handleCountryChange}
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
            Document name
          </FormLabel>
          <LocaleTextInputField
            property={"name"}
            errors={errors}
            control={control}
            language={language}
            name={"Document name"}
            length={100}
            multiline={false}
            minRows={1}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="content" required>
            Content
          </FormLabel>
          <LocaleTextInputField
            property={"content"}
            language={language}
            name="Content"
            control={control}
            errors={errors}
            length={500}
            minRows={14}
            multiline={true}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="source" required>
            Source
          </FormLabel>
          <NonLocaleInputField
            minRows={14}
            length={2100}
            control={control}
            errors={errors}
            fieldLabel="source"
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

        <FormGrid item xs={12} md={6}></FormGrid>
        <FormGrid item>
          <CreateButtonGroup
            nagivateTo={"/documentation"}
            typeOfForm={typeOfForm}
          />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default DocumentationForm;
