export interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  adminName: string;
  roles: string[];
  status: string;
}

export interface AdminFormProps {
  typeOfForm: string;
  adminData?: {
    email: string;
    firstName: string;
    lastName: string;
    adminName: string;
    roles: string[];
    status: number;
    id: string;
  };
}
