import { CssBaseline, Grid, SelectChangeEvent, ThemeProvider } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Controller, Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCountries } from "../../api/country";
import { createTopic, updateTopic } from "../../api/topic";
import ErrorSummary from "../../components/formComponents/ErrorSummary";
import SelectInputField from "../../components/formComponents/SelectInputField";
import SelectStatusInputField from "../../components/formComponents/SelectStatusInputField";
import UploadFile from "../../components/formComponents/UploadFile";
import CreateButtonGroup from "../../components/reusable/CreateButtonGroup";
import { FormGrid } from "../../constant/FormGrid";
import { languageOptions } from "../../constant/languageOptions";
import { FormValues, TopicFormProps } from "../../interfaces/topic.interface";
import theme from "../../theme/GlobalCustomTheme";

const languageLookup = languageOptions.reduce((acc, option) => {
  acc[option.value] = option.label;
  return acc;
}, {} as { [key: string]: string });

const resolver: Resolver<FormValues> = async (values) => {
  console.log(values);
  const { localeData, image, country } = values;
  const errors: any = {};

  if (!image) {
    errors.image = {
      type: "required",
      message: "Image is required.",
    };
  }
  if (!country) {
    errors.countryId = {
      type: "required",
      message: "Country is required.",
    };
  }
  Object.keys(localeData).forEach((key) => {
    if (!localeData[key].description.trim()) {
      errors.localeData = {
        ...errors.localeData,
        [key]: {
          description: {
            type: "required",
            message: `Description of ${languageLookup[key]} is required.`,
          },
        },
      };
    }
  });

  Object.keys(localeData).forEach((key) => {
    if (!localeData[key].name.trim()) {
      errors.localeData = {
        ...errors.localeData,
        [key]: {
          name: {
            type: "required",
            message: `Name of ${languageLookup[key]} is required.`,
          },
        },
      };
    }
  });

  return {
    values: Object.keys(errors).length === 0 ? values : {},
    errors,
  };
};

const TopicForm: React.FC<TopicFormProps> = ({ typeOfForm, topicData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<any>({
    mode: "onChange",
    resolver,
    defaultValues: {
      language: "en-US",
      localeData: {
        "en-US": { name: "", description: "" },
        "ja-JP": { name: "", description: "" },
        "vi-VN": { name: "", description: "" },
      },
    },
  });
  const [loading, setLoading] = useState<boolean>(true);

  const [countryNames, setCountryNames] = useState<any[]>([]);
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

  const navigate = useNavigate();
  const language = watch("language");
  const activeCompulsory = typeOfForm === "create" ? true : false;

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("language", value);
    setSelectedLanguage(value);
  };

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    setValue("country", value);
  };

  useEffect(() => {
    if (typeOfForm === "update" && topicData) {
      console.log("Updating form with topicData:", topicData);
      const status = topicData.status === 1 ? "active" : "inactive";
      setValue("image", topicData.image);
      setValue("status", status);
      setValue("localeData", topicData.localeData);
      setValue("country", topicData.countryId);

      Object.keys(topicData.localeData).forEach((locale: any) => {
        setValue(
          `localeData[${locale}].description`,
          topicData.localeData[locale].description
        );
        setValue(
          `localeData[${locale}].name`,
          topicData.localeData[locale].name
        );
      });
    }
  }, [topicData]);

  const onSubmit = async (data: any) => {
    const body = {
      image: data.image[0],
      name: data.localeData["en-US"].name,
      description: data.localeData["en-US"].description,
      localeData: data.localeData,
      countryId: data.country,
    };
    console.log("Topic form submitted with data:", body);

    try {
      if (typeOfForm === "create") {
        const response = await createTopic(body);
        if (response.data.success) {
          toast.success("Topic created successfully.");
          navigate("/topic");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } else if (typeOfForm === "update" && topicData) {
        const response = await updateTopic(topicData?.id, body);
        if (response.data.success) {
          toast.success("Topic updated successfully.");
          navigate("/topic");
        } else {
          toast.error("An error occurred. Please try again.");
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>{typeOfForm === "create" ? "Create a" : "Update"} topic</h1>
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
          <FormLabel htmlFor="country-select" required>
            Country
          </FormLabel>
          <SelectInputField
            control={control}
            errors={errors}
            name="country"
            label="country"
            options={countryNames}
            onChange={handleCountryChange}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="name" required>
            Topic name
          </FormLabel>
          <Controller
            name={`localeData[${language}].name`}
            key={`localeData[${language}].name`}
            control={control}
            rules={{
              required: `Topic name is required`,
              maxLength: {
                value: 50,
                message: `Topic name must be less than 50 characters`,
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                placeholder={`Enter `}
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
                placeholder={`Enter `}
                variant="outlined"
                fullWidth
                multiline
                margin="normal"
                inputProps={{ maxLength: 1500 }}
                error={!!errors.localeData?.[language]?.description}
                helperText={errors.localeData?.[language]?.description?.message}
              />
            )}
          />
        </FormGrid>

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

export default TopicForm;
