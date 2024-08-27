import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const useToastCreateSuccess = () => {
  const { t } = useTranslation();
  return () => toast.success(t("toast.createSuccess"));
};

export const useToastUpdateSuccess = () => {
  const { t } = useTranslation();
  return () => toast.success(t("toast.updateSuccess"));
};

export const useToastError = () => {
  const { t } = useTranslation();
  return () => toast.error(t("toast.error"));
};
