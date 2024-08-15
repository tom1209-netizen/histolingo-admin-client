import React, { useEffect, useState } from "react";
import NavTabs from "../../components/reusable/NavTabs";
import { Box } from "@mui/material";
import SearchField from "../../components/reusable/SearchField";
import CreateImportButtonGroup from "../../components/reusable/CreateImportButtonGroup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { convertSearchParamsToObj } from "../../utils/common";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { PreviewOutlined } from "@mui/icons-material";
import DataTable from "../../components/reusable/Table";
import { formatTimestamp } from "../../utils/formatTime";
import { getLearners, switchLearnerStatus } from "../../api/learners";

const Learner = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchLearnerQuery = convertSearchParamsToObj(searchParams);
  const [loading, setLoading] = useState<boolean>(true);
  const [learners, setLearners] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const navigate = useNavigate();

  const handleStatusChange = async (id: any, status: any) => {
      const response = await switchLearnerStatus(id, status);
      console.log(response)
  };

  const handleViewDetail = (id: string) => {
    navigate(`/learnerdetail/${id}`);
  }
  

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200, flex: 1 },
    { field: "description", headerName: "Description", width: 450,  flex: 1 },
    { field: "createdAt", headerName: "Created At", width: 130, flex: 1 },
    { field: "updatedAt", headerName: "Updated At", width: 130, flex: 1 },
    {
      field: "status",
      flex: 0,
      headerName: "Status",
      description:
        "This column allows users to switch the status of the data (aka soft delete).",
      width: 90,
      renderCell: (params) => {
        console.log(params);
        return <Switch defaultChecked={params.row.status == 1} onChange={() => handleStatusChange(params.row._id, params.row.status == 1 ? 0 : 1)} />;
      },
    },
    {
      field: "edit",
      headerName: "See detail",
      width: 100,
      flex: 0,
      align:"right",
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

  const fetchLearners = async (page: number, pageSize: number) => {
    try {
      const response = await getLearners({
        ...searchLearnerQuery,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });
      const learnersData = response.data.data.learners;
      const formattedLearners = learnersData.map((learner: any) => ({
        ...learner,
        createdAt: formatTimestamp(learner.createdAt),
        updatedAt: formatTimestamp(learner.updatedAt),
      }));
      const totalRows = response.data.data.totalCount;
      console.log(learnersData);
      setLearners(formattedLearners);
      setRowCount(totalRows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLearners(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
    fetchLearners(model.page, model.pageSize);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>Learner Dashboard</h1>
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
              setSearchParams({ ...searchLearnerQuery, status: value })
            }
            value=""
          />
          <SearchField
            label="Search learner"
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchLearnerQuery, search: value })
            }
          />
        </Box>
        <CreateImportButtonGroup createPath="/learnerdetail" importPath="/" />
      </Box>
      <DataTable
        columns={columns}
        rows={learners}
        getRowId={(row) => row._id}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Learner;
