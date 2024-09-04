export interface FormValues {
  roleName: string;
  status: number;
  privilege: string[];
}

export interface RoleFormProps {
  typeOfForm: "create" | "update";
}

export interface FlattenedPermission {
  [key: string]: number;
}

