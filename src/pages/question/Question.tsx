import React, { useEffect, useState } from "react";
import NavTabs from "../../components/reusable/NavTabs";
import { Box } from "@mui/material";
import SearchField from "../../components/reusable/SearchField";
import CreateImportButtonGroup from "../../components/reusable/CreateImportButtonGroup";
import { useSearchParams } from "react-router-dom";
import { convertSearchParamsToObj } from "../../utils/common";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { EditOutlined } from "@mui/icons-material";
import DataTable from "../../components/reusable/Table";
import { useRowActions } from "../../hooks/useRowActions";
import { formatTimestamp } from "../../utils/formatTime";
import { getQuestions, switchQuestionStatus } from "../../api/question";
import { LoadingTable } from "../../components/reusable/Loading";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Question = () => {
  const { t } = useTranslation();
  const { handleEditRow } = useRowActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuestionQuery: any = convertSearchParamsToObj(searchParams);
  const [loading, setLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

  const handleStatusChange = async (id: any, status: any) => {
    setLoadingStatus(true);
    try {
      const response = await switchQuestionStatus(id, status);
      if (response.status === 200) {
        toast.success(t("toast.switchStatusSuccess"));
        fetchQuestions(paginationModel.page, paginationModel.pageSize);
      } else {
        toast.error(t("toast.switchStatusFail"));
      }
    } catch (error) {
      toast.error(t("toast.switchStatusFail"));
    } finally {
      setLoadingStatus(false);
    }
  };

  const columns: GridColDef[] = [
    { field: "ask", headerName: t("question"), width: 250 },
    {
      field: "topic",
      headerName: t("topic"),
      width: 180,
      valueGetter: (value, row) => (row.topic ? row.topic.name : "N/A"),
    },
    {
      field: "country",
      headerName: t("country"),
      width: 130,
      valueGetter: (value, row) => (row.country ? row.country.name : "N/A"),
    },
    {
      field: "questionType",
      headerName: t("questionType"),
      width: 130,
      valueGetter: (value, row) => {
        switch (row.questionType) {
          case 0:
            return t("questionDashboard.mcq");
          case 1:
            return t("questionDashboard.tf");
          case 2:
            return t("questionDashboard.matching");
          case 3:
            return t("questionDashboard.fill");
          default:
            return "N/A";
        }
      },
    },
    { field: "createdAt", headerName: t("createdAt"), width: 130 },
    { field: "updatedAt", headerName: t("updatedAt"), width: 130 },
    {
      field: "status",
      headerName: t("status"),
      description:
        "This column allows users to switch the status of the data (aka soft delete).",
      width: 90,
      renderCell: (params) => (
        <Switch
          disabled={loadingStatus}
          defaultChecked={params.row.status == 1}
          onChange={() =>
            handleStatusChange(params.row._id, params.row.status === 1 ? 0 : 1)
          }
        />
      ),
    },
    {
      field: "edit",
      headerName: t("edit"),
      width: 50,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditRow(params.id.toString(), "question")}
          color="primary"
          aria-label="delete"
        >
          <EditOutlined />
        </IconButton>
      ),
    },
  ];

  const fetchQuestions = async (page: number, pageSize: number) => {
    setIsTableLoading(true);
    try {
      const response = await getQuestions({
        ...searchQuestionQuery,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });
      const questionsData = response.data.data.questions;
      const formattedQuestions = questionsData.map((question: any) => ({
        ...question,
        createdAt: formatTimestamp(question.createdAt),
        updatedAt: formatTimestamp(question.updatedAt),
      }));
      const totalRows = response.data.data.totalQuestions;
      console.log(questionsData);
      setQuestions(formattedQuestions);
      setRowCount(totalRows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  if (loading) {
    return <LoadingTable />;
  }
  return (
    <>
      <h1>{t("questionDashboard.title")}</h1>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavTabs
            onChange={(value: any) =>
              setSearchParams({ ...searchQuestionQuery, status: value })
            }
            value={searchQuestionQuery.status || ""}
          />
          <SearchField
            label={`${t("search")} ${t("questionDashboard.question")}`}
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchQuestionQuery, search: value.trim() })
            }
          />
        </Box>
        <CreateImportButtonGroup createPath="/createquestion" />
      </Box>
      <DataTable
        isLoading={isTableLoading}
        columns={columns}
        rows={questions}
        getRowId={(row) => row._id}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Question;
