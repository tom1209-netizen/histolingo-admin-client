import React from "react";
import { FormGrid } from "../../../constant/FormGrid";
import { FormLabel } from "@mui/material";
import MultipleChoiceText from "./MCQText";
import { useTranslation } from "react-i18next";

const MCQQuestionText = ({ language, control, errors }) => {
  const { t } = useTranslation();
  return (
    <>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="answer-text-A" required>
          {t("createQuestion.inputFields.answer")} A
        </FormLabel>
        <MultipleChoiceText
          index={0}
          property="options"
          language={language}
          name="Answer A"
          control={control}
          errors={errors}
          length={500}
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="answer-text-B" required>
          {t("createQuestion.inputFields.answer")} B
        </FormLabel>
        <MultipleChoiceText
          index={1}
          property="options"
          language={language}
          length={500}
          name="Answer B"
          control={control}
          errors={errors}
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="answer-text-C" required>
          {t("createQuestion.inputFields.answer")} C
        </FormLabel>
        <MultipleChoiceText
          index={2}
          property="options"
          language={language}
          length={500}
          name="Answer C"
          control={control}
          errors={errors}
        />
      </FormGrid>

      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="answer-text-D" required>
          {t("createQuestion.inputFields.answer")} D
        </FormLabel>
        <MultipleChoiceText
          index={3}
          property="options"
          language={language}
          length={500}
          name="Answer D"
          control={control}
          errors={errors}
        />
      </FormGrid>
    </>
  );
};

export default MCQQuestionText;
