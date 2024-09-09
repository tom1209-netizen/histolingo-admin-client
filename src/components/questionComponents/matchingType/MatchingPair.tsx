import { FormLabel } from "@mui/material";
import React from "react";
import { Control, FieldErrors } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { FormGrid } from "../../../constant/FormGrid";
import PairText from "./PairText";
import { useTranslation } from "react-i18next";

interface InputFieldProps {
  control: Control<any>;
  errors: FieldErrors<any>;
  language: string;
  index?: number;
}

const MatchingPair: React.FC<InputFieldProps> = ({
  language,
  control,
  errors,
  index,
}) => {
  const { t } = useTranslation();
  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="leftColumn" required>
          {t("createQuestion.inputFields.leftColumn")}
        </FormLabel>
        <PairText
          position="leftColumn"
          property="answer"
          index={index}
          language={language}
          label={t("createQuestion.inputFields.leftColumn")}
          control={control}
          errors={errors}
          length={500}
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="rightColumn" required>
        {t("createQuestion.inputFields.rightColumn")}
        </FormLabel>
        <PairText
          index={index}
          position="rightColumn"
          property="answer"
          language={language}
          length={500}
          label={t("createQuestion.inputFields.rightColumn")}
          control={control}
          errors={errors}
        />
      </FormGrid>
    </div>
  );
};

export default MatchingPair;
