export interface BaseFormValues {
  topicId: string;
  countryId: string;
  questionType: 0 | 1 | 2 | 3;
  status: string;
  localeData: any;
}

export interface MultipleChoiceFormValues extends BaseFormValues {
  questionType: 0;
  options: string[];
  answer: number;
}

export interface TrueFalseFormValues extends BaseFormValues {
  questionType: 1;
  answer: boolean;
}

export interface MatchingFormValues extends BaseFormValues {
  questionType: 2;
  leftColumn: string[];
  rightColumn: string[];
  answer: { leftColumn: string; rightColumn: string }[];
}

export interface FillInTheBlankFormValues extends BaseFormValues {
  questionType: 3;
  answer: string[];
}

export type FormValues =
  | TrueFalseFormValues
  | MultipleChoiceFormValues
  | MatchingFormValues
  | FillInTheBlankFormValues;

export interface QuestionFormProps {
  typeOfForm: string;
  questionData?: any;
}
