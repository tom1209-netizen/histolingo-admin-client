import { useNavigate } from "react-router-dom";

export const useRowActions = () => {
  const navigate = useNavigate();

  const handleEditRow = (id: string, path: string) => {
    navigate(`/${path}/${id}`);
  };

  return {
    handleEditRow,
  };
};
