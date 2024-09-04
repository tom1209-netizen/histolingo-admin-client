export interface FormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  adminName: string;
  roles: string[];
  status: number;
}

export interface AdminData {
  adminName: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: string[];
  status: number;
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


