import { PreviewOutlined } from "@mui/icons-material";
import { Box, Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getFeedbacks, switchFeedbackStatus } from "../../api/feedback";
import CreateImportButtonGroup from "../../components/reusable/CreateImportButtonGroup";
import NavTabs from "../../components/reusable/NavTabs";
import SearchField from "../../components/reusable/SearchField";
import DataTable from "../../components/reusable/Table";
import { convertSearchParamsToObj } from "../../utils/common";
import { formatTimestamp } from "../../utils/formatTime";
import { LoadingTable } from "../../components/reusable/Loading";
import { toast } from "react-toastify";
import FeedbackDialog from "./FeedbackDialog";
import { useTranslation } from "react-i18next";
import { DataContext } from "../../components/layouts/ProfileContext";
import { permission } from "process";
import { rolePrivileges } from "../../constant/rolePrivileges";

const Feedback = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFeedbackQuery: any = convertSearchParamsToObj(searchParams);
  const [loading, setLoading] = useState<boolean>(true);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [open, setOpen] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);

  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error("Component must be used within a DataProvider");
  }
  const { profileData } = context;

  const handleStatusChange = async (id: any, status: any) => {
    setLoadingStatus(true);
    try {
      const response = await switchFeedbackStatus(id, status);
      if (response.status === 200) {
        toast.success(t("toast.switchStatusSuccess"));
        fetchFeedbacks(paginationModel.page, paginationModel.pageSize);
      } else {
        toast.error(t("toast.switchStatusFail"));
      }
    } catch (error) {
      toast.error(t("toast.switchStatusFail"));
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleViewDetail = (row) => {
    console.log(row);
    setOpen(true);
    setSelectedFeedback(row);
  };

  const columns: GridColDef[] = [
    {
      field: "createdBy",
      headerName: t("feedbackDashboard.table.playerName"),
      valueGetter: (value, row) => row.player.fullName,
      flex: 1,
      sortable: false,
    },
    { field: "content", headerName: "Feedback", flex: 3, sortable: false },
    {
      field: "testId",
      headerName: t("feedbackDashboard.table.test"),
      flex: 1,
      valueGetter: (value, row) => row.test.name,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: t("createdAt"),
      flex: 1,
      sortable: false,
    },
    ...(profileData?.permissions.includes(rolePrivileges.feedback.update)
      ? [
          {
            field: "detail",
            headerName: t("feedbackDashboard.table.detail"),
            width: 100,
            flex: 0,
            sortable: false,
            renderCell: (params) => (
              <IconButton
                onClick={() => handleViewDetail(params.row)}
                color="primary"
                aria-label="delete"
              >
                <PreviewOutlined />
              </IconButton>
            ),
          },
        ]
      : []),
  ];

  const fetchFeedbacks = async (page: number, pageSize: number) => {
    setIsTableLoading(true);
    try {
      const response = await getFeedbacks({
        ...searchFeedbackQuery,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });
      const feedbacksData = response.data.data.feedbacks;
      const formattedFeedbacks = feedbacksData.map((feedback: any) => ({
        ...feedback,
        createdAt: formatTimestamp(feedback.createdAt),
        updatedAt: formatTimestamp(feedback.updatedAt),
      }));
      const totalRows = response.data.data.totalFeedbacks;
      console.log(feedbacksData);
      setFeedbacks(formattedFeedbacks);
      setRowCount(totalRows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  if (loading) {
    return <LoadingTable />;
  }

  return (
    <>
      <h1>{t("feedbackDashboard.title")}</h1>
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
              setSearchParams({ ...searchFeedbackQuery, status: value })
            }
            value={searchFeedbackQuery.status}
          />
          <SearchField
            label={`${t("search")} feedback`}
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchFeedbackQuery, search: value.trim() })
            }
          />
        </Box>
      </Box>
      <DataTable
        isLoading={isTableLoading}
        columns={columns}
        rows={feedbacks}
        getRowId={(row) => row._id}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPageChange={handlePageChange}
      />
      <FeedbackDialog
        feedback={selectedFeedback}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </>
  );
};

export default Feedback;
