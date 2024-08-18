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

const Feedback = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchFeedbackQuery = convertSearchParamsToObj(searchParams);
  const [loading, setLoading] = useState<boolean>(true);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleStatusChange = async (id: any, status: any) => {
    const response = await switchFeedbackStatus(id, status);
    console.log(response);
  };

  const handleViewDetail = (id: string) => {
    navigate(`/feedbackdetail/${id}`);
  };

  const columns: GridColDef[] = [
    { field: "createdBy", headerName: "Name", flex: 1 },
    { field: "content", headerName: "Content", flex: 3 },
    { field: "testId", headerName: "Test", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    {
      field: "status",
      flex: 0,
      headerName: "Status",
      description:
        "This column allows users to switch the status of the data (aka soft delete).",
      width: 90,
      renderCell: (params) => {
        console.log(params);
        return (
          <Switch
            defaultChecked={params.row.status == 1}
            onChange={() =>
              handleStatusChange(params.row._id, params.row.status == 1 ? 0 : 1)
            }
          />
        );
      },
    },
    {
      field: "edit",
      headerName: "See detail",
      width: 100,
      flex: 0,
      align: "right",
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleViewDetail(params.row._id)}
          color="primary"
          aria-label="delete"
        >
          <PreviewOutlined />
        </IconButton>
      ),
    },
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
      <h1>Feedback Dashboard</h1>
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
            value=""
          />
          <SearchField
            label="Search feedback"
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchFeedbackQuery, search: value })
            }
          />
        </Box>
        <CreateImportButtonGroup createPath="/feedbackdetail" importPath="/" />
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
    </>
  );
};

export default Feedback;
