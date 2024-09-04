export interface FormValues {
  name: string;
  status: number;
  questionsId: any[];
  countryId: string;
  topicId: string;
  documentationsId: string[];
  localeData: {
    name: string;
  };
}

export interface TestFormProps {
  typeOfForm: string;
  testData?: {
    name: string;
    id: string;
    countryId: { _id: string; name: string };
    topicId: { _id: string; name: string };
    questionsId: {
      _id: string;
    }[];
    status: string;
    documentationsId: {
      _id: string;
    }[];
    localeData: {
      name: string;
    };
  };
}

export interface TestData {
  name: string;
  countryId: string;
  topicId: string;
  questionsId: string[];
  documentationsId: string[];
  localeData: {
    name: string;
  };
}
