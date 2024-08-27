import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateRole } from "../api/roles";

export const useRowActions = () => {
  const navigate = useNavigate();

  const handleEditRow = (id: string, path: string) => {
    navigate(`/${path}/${id}`);
  };

  return {
    handleEditRow,
  };
};
