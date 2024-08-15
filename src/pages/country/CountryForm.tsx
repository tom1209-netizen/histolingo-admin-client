import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Grid, CssBaseline, ThemeProvider, TextField } from "@mui/material";
import theme from "../../theme/GlobalCustomTheme";
import FormLabel from "@mui/material/FormLabel";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import UploadFile from "../../components/formComponents/UploadFile";
import SelectInputField from "../../components/formComponents/SelectInputField";
import { SelectChangeEvent } from "@mui/material";
import ErrorSummary from "../../components/formComponents/ErrorSummary";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { createCountry, updateCountry } from "../../api/country";
import { useNavigate } from "react-router-dom";
import { languageOptions } from "../../constant/languageOptions";
import { FormGrid } from "../../constant/FormGrid";
import { CountryFormProps, FormValues } from "../../interfaces/country.interface";

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
  } = useForm<any>({
    mode: "onChange",
    defaultValues: {
      language: "en-US",
      localeData: {
        "en-US": { name: "", description: "" },
        // "ja-JP": { name: "", description: "" },
        // "vi-VN": { name: "", description: "" },
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

  useEffect(() => {
    const { name, description } = localeData["en-US"] || {};
    setIsEnglishFieldsFilled(name.trim() !== "" && description.trim() !== "");
  }, [localeData["en-US"].name, localeData["en-US"].description]);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setSelectedLanguage(value);
  };

  useEffect(() => {
    if (typeOfForm === "update" && countryData) {
      console.log("Updating form with countryData:", countryData);
      const status = countryData.status === 1 ? "active" : "inactive";
      setValue("image", countryData.image);
      setValue("status", status);
      setValue("localeData", countryData.localeData);

      Object.keys(countryData.localeData).forEach((locale: any) => {
        setValue(
          `localeData[${locale}].description`,
          countryData.localeData[locale].description
        );
        setValue(
          `localeData[${locale}].name`,
          countryData.localeData[locale].name
        );
      });
    }
  }, [countryData]);

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
          <Controller
            name={`localeData[${language}].name`}
            key={`localeData[${language}].name`}
            control={control}
            rules={{
              required: `Country name is required`,
              maxLength: {
                value: 50,
                message: `Country name must be less than 50 characters`,
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={`Enter name`}
                variant="outlined"
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 50 }}
                error={!!errors.localeData?.[language]?.name}
                helperText={errors.localeData?.[language]?.description?.name}
              />
            )}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="description" required>
            Description (max 1500 characters)
          </FormLabel>
          <Controller
            name={`localeData[${language}].description`}
            key={`localeData[${language}].description`}
            control={control}
            rules={{
              required: `Description is required`,
              maxLength: {
                value: 1500,
                message: `Description must be less than 1500 characters`,
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                placeholder={`Enter description`}
                variant="outlined"
                fullWidth
                margin="normal"
                inputProps={{ maxLength: 1500 }}
                error={!!errors.localeData?.[language]?.description}
                helperText={errors.localeData?.[language]?.description?.message}
              />
            )}
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
          <FormLabel htmlFor="image" required>
            Upload Image
          </FormLabel>
          <UploadFile control={control} errors={errors} />
        </FormGrid>

        {/* <FormGrid item xs={12} md={6}></FormGrid> */}
        <FormGrid item xs={12} md={6}>
          <Box>
            <ErrorSummary errors={errors} />
          </Box>
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
