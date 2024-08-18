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
import LocaleTextInputField from "../../components/localeComponents/LocaleTextInputField";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import { FormGrid } from "../../constant/FormGrid";
import { languageOptions } from "../../constant/languageOptions";
import {
  CountryFormProps,
  FormValues,
} from "../../interfaces/country.interface";
import theme from "../../theme/GlobalCustomTheme";

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
    defaultValues: {
      language: "en-US",
      localeData: {
        "en-US": { name: "", description: "" },
      },
    },
  });

  const navigate = useNavigate();
  const language = watch("language");
  const localeData = watch("localeData");
  const activeCompulsory = typeOfForm === "create";
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isEnglishFieldsFilled, setIsEnglishFieldsFilled] =
    useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  

  // CHECK IF ENGLISH FIELDS ARE FILLED
  useEffect(() => {
    const locale = localeData["en-US"] || { name: "", description: "" };
    const { name = "", description = "" } = locale;
    setIsEnglishFieldsFilled(name.trim() !== "" && description.trim() !== "");
  }, [localeData["en-US"]]);

  // HANDLE LANGUAGE CHANGE
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedLanguage(value);
  };

  // FILL DATA IN FORM IF UPDATE FORM
  useEffect(() => {
    if (typeOfForm === "update" && countryData) {
      console.log("Updating form with countryData:", countryData);
      const status = countryData.status === 1 ? "active" : "inactive";
      reset(countryData)
      // setValue("image", countryData.image);
      // setValue("status", status);
      // setValue("localeData", countryData.localeData);
      console.log(language)
      // handleLanguageChange({ target: { value: language } });

      // Object.keys(countryData.localeData).forEach((locale: any) => {
      //   setValue(
      //     `localeData[${locale}].description`,
      //     countryData.localeData[locale].description
      //   );
      //   setValue(
      //     `localeData[${locale}].name`,
      //     countryData.localeData[locale].name
      //   );
      // });
    }
  }, [countryData]);

  // SUBMIT FORM
  const onSubmit = async (data: FormValues) => {
    if (
      !localeData["en-US"].name.trim() ||
      !localeData["en-US"].description.trim()
    ) {
      toast.error(
        "Please fill in the name and description for English language."
      );
      return;
    }
    const body = {
      image: data.image[0],
      name: data.localeData["en-US"].name,
      description: data.localeData["en-US"].description,
      localeData: data.localeData,
    };
    console.log("Country form submitted with data:", body);

    try {
      if (typeOfForm === "create") {
        const response = await createCountry(body);
        if (response.data.success) {
          toast.success("Country created successfully.");
          navigate("/country");
        } else {
          console.log(response);
          toast.error("An error occurred. Please try again.");
        }
      } else if (typeOfForm === "update" && countryData) {
        const response = await updateCountry(countryData?.id, body);
        if (response.data.success) {
          toast.success("Country updated successfully.");
          navigate("/country");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again.");
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
            name={"Country name"}
            length={50}
            minRows={1}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="image" required>
            Upload Image
          </FormLabel>
          <UploadFile control={control} errors={errors} initialImageUrl={countryData?.image}  />
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
            name={"Description"}
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
          <CreateButtonGroup
            buttonName={typeOfForm === "create" ? "Create" : "Update"}
          />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
};

export default CountryForm;
