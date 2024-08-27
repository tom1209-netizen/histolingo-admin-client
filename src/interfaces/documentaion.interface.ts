export interface DocumentationFormProps {
  typeOfForm: string;
  documentationData?: {
    name: string;
    content: string;
    source: string;
    country: string;
    topic: string;
    image: string;
    id: string;
    status: string;
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
  source: string;
  image: File | null;
  status: string;
  localeData: {
    "en-US": { name: string; content: string };
    "ja-JP": { name: string; content: string };
    "vi-VN": { name: string; content: string };
  };
}
