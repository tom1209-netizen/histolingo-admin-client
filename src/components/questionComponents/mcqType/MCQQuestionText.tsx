import React from "react";
import { FormGrid } from "../../../constant/FormGrid";
import { FormLabel } from "@mui/material";
import MultipleChoiceText from "./MCQText";

const MCQQuestionText = ({ language, control, errors }) => {
  return (
    <>
      <FormGrid item xs={12} md={6}>
        <FormLabel htmlFor="answer-text-A" required>
          Question A
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
          Question B
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
          Question C
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
          Question D
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
