import {
  CssBaseline,
  Grid,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createCountry, updateCountry } from "../../api/country";
import SelectInputField from "../../components/formComponents/SelectInputField";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import UploadFile from "../../components/formComponents/UploadFile";
import LocaleTextInputField from "../../components/formComponents/LocaleTextInputField";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import { FormGrid } from "../../constant/FormGrid";
import { languageOptions } from "../../constant/languageOptions";
import {
  CountryFormProps,
  FormValues,
} from "../../interfaces/country.interface";
import theme from "../../theme/GlobalCustomTheme";
import { uploadFile } from "../../api/upload";
import { useTranslation } from "react-i18next";

const defaultFormValues = {
  language: "en-US",
  localeData: {
    "en-US": { name: "", description: "" },
  },
};

const CountryForm: React.FC<CountryFormProps> = ({
  typeOfForm,
  countryData,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<any>({
    mode: "onChange",
    defaultValues: defaultFormValues,
  });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const language = watch("language");
  const localeData = watch("localeData");
  const activeCompulsory = typeOfForm === "create";
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isEnglishFieldsFilled, setIsEnglishFieldsFilled] =
    useState<boolean>(true);

  // CHECK IF ENGLISH FIELDS ARE FILLED
  useEffect(() => {
    const locale = localeData["en-US"] || { name: "", description: "" };
    const { name = "", description = "" } = locale;
    setIsEnglishFieldsFilled(name.trim() !== "" && description.trim() !== "");
  }, [localeData]);

  // HANDLE LANGUAGE CHANGE
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedLanguage(value);
  };

  // FILL DATA IN FORM IF UPDATE FORM
  useEffect(() => {
    if (typeOfForm === "update" && countryData) {
      console.log("Updating form with countryData:", countryData);
      reset({ ...defaultFormValues, ...countryData });
    }
  }, [countryData]);

  // SUBMIT FORM
  const onSubmit = async (data: FormValues) => {
    if (
      !localeData["en-US"].name.trim() ||
      !localeData["en-US"].description.trim()
    ) {
      toast.error(t("toast.enUS"));
      return;
    }

    let image;
    try {
      if (data.image) {
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
    };
    console.log("Country form submitted with data:", body);

    try {
      if (typeOfForm === "create") {
        const response = await createCountry(body);
        if (response.data.success) {
          toast.success(t("toast.createSuccess"));
          navigate("/country");
        } else {
          console.log(response);
          toast.error(t("toast.error"));
        }
      } else if (typeOfForm === "update" && countryData) {
        const response = await updateCountry(countryData?.id, body);
        if (response.data.success) {
          toast.success(t("toast.updateSuccess"));
          navigate("/country");
        } else {
          toast.error(t("toast.error"));
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error(t("toast.error"));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>{typeOfForm === "create" ? "Create a" : "Update"} country</h1>
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
            Country name
          </FormLabel>
          <LocaleTextInputField
            property={"name"}
            multiline={false}
            errors={errors}
            control={control}
            language={language}
            label={"Country name"}
            length={50}
            minRows={1}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="image" required>
            Upload Image
          </FormLabel>
          <UploadFile
            control={control}
            errors={errors}
            initialImageUrl={countryData?.image}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="description" required>
            Description (max 1500 characters)
          </FormLabel>
          <LocaleTextInputField
            property={"description"}
            errors={errors}
            control={control}
            language={language}
            label={"Description"}
            length={1500}
            multiline={true}
            minRows={14}
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
          <CreateButtonGroup nagivateTo={"/country"} typeOfForm={typeOfForm} />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default CountryForm;
