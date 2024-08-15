export interface FormValues {
  roleName: string;
  status: string;
  selectPrivilege: string[];
}

export interface RoleFormProps {
  typeOfForm: "create" | "update";
}

export interface FlattenedPermission {
  [key: string]: number;
}

