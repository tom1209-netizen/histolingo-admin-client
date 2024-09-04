import { Box, Switch } from "@mui/material";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getLearners, switchLearnerStatus } from "../../api/learners";
import { LoadingTable } from "../../components/reusable/Loading";
import NavTabs from "../../components/reusable/NavTabs";
import SearchField from "../../components/reusable/SearchField";
import DataTable from "../../components/reusable/Table";
import { convertSearchParamsToObj } from "../../utils/common";

const Learner = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchLearnerQuery: any = convertSearchParamsToObj(searchParams);
  const [loading, setLoading] = useState<boolean>(true);
  const [learners, setLearners] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleStatusChange = async (id: any, status: any) => {
    const response = await switchLearnerStatus(id, status);
    if (response.status === 200) {
      toast.success(t("toast.switchStatusSuccess"));
    } else {
      toast.error(t("toast.switchStatusFail"));
    }
  };

  const columns: GridColDef[] = [
    { field: "userName", headerName: t("learnerDashboard.table.username"), flex: 1, sortable: false },
    { field: "rank", headerName: t("learnerDashboard.table.ranking"), flex: 1, sortable: false },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
      sortable: false,
    },
    {
      field: "registrationDate",
      headerName: t("learnerDashboard.table.registrationDate"),
      flex: 1,

      sortable: false,
    },
    {
      field: "totalScore",
      headerName: t("learnerDashboard.table.totalScore"),
      flex: 1,
      sortable: false,
    },
    {
      field: "totalTime",
      headerName: t("learnerDashboard.table.totalTime"),
      flex: 1,
      sortable: false,
    },
    {
      field: "status",
      flex: 0,
      headerName: t("learnerDashboard.table.status"),
      description:
        "This column allows users to switch the status of the data (aka soft delete).",
      width: 90,
      renderCell: (params) => {
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
  ];

  const fetchLearners = async (page: number, pageSize: number) => {
    setIsTableLoading(true);
    try {
      const response = await getLearners({
        ...searchLearnerQuery,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });
      const learnersData = response.data.data.players;
      const totalRows = response.data.data.totalCount;
      setLearners(learnersData);
      setRowCount(totalRows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsTableLoading(false);
    }
  };
  useEffect(() => {
    fetchLearners(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  if (loading) {
    return <LoadingTable />;
  }
  return (
    <>
      <h1>{t("learnerDashboard.title")}</h1>
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
            value={searchLearnerQuery.status || ""}
          />
          <SearchField
            label={`${t("search")} ${t( "learnerDashboard.learner")}`}
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchLearnerQuery, search: value.trim() })
            }
          />
        </Box>
      </Box>
      <DataTable
        isLoading={isTableLoading}
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
