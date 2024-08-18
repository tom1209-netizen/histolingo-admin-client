export interface FormValues {
  name: string;
  countryId: string;
  topicId: string;
  status: string;
  questions: string[];
}

export interface TestFormProps {
  typeOfForm: string;
  testData?: {
    name: string;
    countryId: string;
    topicId: string;
    questions: string[];
    status: number;
    id: string;
  };
}
