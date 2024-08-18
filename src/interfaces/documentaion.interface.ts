export interface DocumentationFormProps {
  typeOfForm: string;
  documentationData?: {
    name: string;
    content: string;
    countryId: string;
    topicId: string;
    id: string;
    status: number;
    localeData: {
      "en-US": { name: string; content: string };
      "ja-JP": { name: string; content: string };
      "vi-VN": { name: string; content: string };
    };
  };
}

export interface FormValues {
  name: string;
  content: string;
  country: string;
  topic: string;
  status: string;
  localeData: {
    "en-US": { name: string; content: string };
    "ja-JP": { name: string; content: string };
    "vi-VN": { name: string; content: string };
  };
}
