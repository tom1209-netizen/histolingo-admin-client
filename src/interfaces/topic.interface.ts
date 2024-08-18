export interface TopicFormProps {
  typeOfForm: string;
  topicData?: {
    name: string;
    description: string;
    id: string;
    status: number;
    image: string;
    localeData: {
      "en-US": { name: string; description: string };
      "ja-JP": { name: string; description: string };
      "vi-VN": { name: string; description: string };
    };
    countryId: string;
  };
}

export interface FormValues {
  name: string;
  description: string;
  image: string;
  country: string;
  localeData: {
    "en-US": { name: string; description: string };
    "ja-JP": { name: string; description: string };
    "vi-VN": { name: string; description: string };
  };
}
