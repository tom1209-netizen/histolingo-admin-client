export interface FormValues {
  name: string;
  description: string;
  image: string;
  localeData: {
    "en-US": { name: string; description: string };
    "ja-JP": { name: string; description: string };
    "vi-VN": { name: string; description: string };
  };
}

export interface CountryFormProps {
  typeOfForm: string;
  countryData?: {
    name: string;
    description: string;
    image: string;
    localeData: {
      "en-US": { name: string; description: string };
      "ja-JP": { name: string; description: string };
      "vi-VN": { name: string; description: string };
    };
    status: number;
    id: string;
  };
}
