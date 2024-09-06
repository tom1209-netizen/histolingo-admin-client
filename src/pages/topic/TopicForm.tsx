import {
  CssBaseline,
  Grid,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCountries } from "../../api/country";
import { createTopic, updateTopic } from "../../api/topic";
import { uploadFile } from "../../api/upload";
import LocaleTextInputField from "../../components/formComponents/LocaleTextInputField";
import SelectInputField from "../../components/formComponents/SelectInputField";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import UploadFile from "../../components/formComponents/UploadFile";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import { LoadingForm } from "../../components/reusable/Loading";
import { FormGrid } from "../../constant/FormGrid";
import { languageOptions } from "../../constant/languageOptions";
import { TopicFormProps } from "../../interfaces/topic.interface";
import theme from "../../theme/GlobalCustomTheme";

const defaultFormValues = {
  language: "en-US",
  localeData: {
    "en-US": { name: "", description: "" },
  },
};
const TopicForm: React.FC<TopicFormProps> = ({ typeOfForm, topicData }) => {
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

  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const localeData = watch("localeData");
  const language = watch("language");
  let image = watch("image");
  const activeCompulsory = typeOfForm === "create" ? true : false;
  const [countryNames, setCountryNames] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isEnglishFieldsFilled, setIsEnglishFieldsFilled] =
    useState<boolean>(true);

  // HANDLE LANGUAGE CHANGE
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedLanguage(value);
  };

  // HANDLE FETCH DATA FOR UPDATE FORM
  useEffect(() => {
    if (typeOfForm === "update" && topicData) {
      console.log("Updating form with topicData:", topicData);
      reset({ ...defaultFormValues, ...topicData });
    }
  }, [topicData]);

  //   FETCH COUNTRIES
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

  // HANDLE SWITCH COUNTRY
  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("country", value);
  };

  // CHECK IF ENGLISH FIELDS ARE FILLED
  useEffect(() => {
    const locale = localeData["en-US"] || { name: "", description: "" };
    const { name = "", description = "" } = locale;
    setIsEnglishFieldsFilled(name.trim() !== "" && description.trim() !== "");
  }, [localeData]);

  // HANDLE FORM SUBMISSION
  const onSubmit = async (data: any) => {
    if (
      !localeData["en-US"].name.trim() ||
      !localeData["en-US"].description.trim()
    ) {
      toast.error(t("toast.enUS"));
      return;
    }

    let image = topicData?.image || "";
    console.log(data.image, "data.image");
    try {
      if (data.image instanceof File) {
        console.log("data.image:", data.image);
        const response = await uploadFile(data.image);
        image = response.data.data.fileUrl;
        console.log(image);
      }
    } catch (error) {
      toast.error(t("toast.uploadFail"));
    }
    const body = {
      image: image,
      name: data.localeData["en-US"].name,
      description: data.localeData["en-US"].description,
      localeData: data.localeData,
      countryId: data.country,
      status: 1,
    };
    console.log("Topic form submitted with data:", body);

    try {
      if (typeOfForm === "create") {
        const response = await createTopic(body);
        if (response.data.success) {
          toast.success(t("toast.createSuccess"));
          navigate("/topic");
        } else {
          toast.error(t("toast.error"));
        }
      } else if (typeOfForm === "update" && topicData) {
        body["status"] = data.status;
        const response = await updateTopic(topicData?.id, body);
        if (response.data.success) {
          toast.success(t("toast.updateSuccess"));
          navigate("/topic");
        } else {
          toast.error(t("toast.error"));
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(t("toast.error"));
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
          ? t("createTopic.createTopic")
          : t("createTopic.updateTopic")}
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
          <FormLabel htmlFor="country-select" required>
            {t("country")}
          </FormLabel>
          <SelectInputField
            control={control}
            errors={errors}
            name="countryId"
            label={t("country")}
            options={countryNames}
            onChange={handleCountryChange}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="name" required>
            {t("createTopic.inputFields.topicName")}
          </FormLabel>
          <LocaleTextInputField
            property={"name"}
            errors={errors}
            control={control}
            language={language}
            label={t("createTopic.inputFields.topicName")}
            length={100}
            multiline={false}
            minRows={1}
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
          <FormLabel htmlFor="image" required>
            {t("image")}
          </FormLabel>
          <UploadFile
            control={control}
            errors={errors}
            initialImageUrl={topicData?.image}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="description" required>
            {t("description")}
          </FormLabel>
          <LocaleTextInputField
            property={"description"}
            errors={errors}
            control={control}
            language={language}
            label={t("description")}
            length={1500}
            multiline={true}
            minRows={14}
          />
        </FormGrid>

        <FormGrid item>
          <CreateButtonGroup nagivateTo={"/topic"} typeOfForm={typeOfForm} />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default TopicForm;
