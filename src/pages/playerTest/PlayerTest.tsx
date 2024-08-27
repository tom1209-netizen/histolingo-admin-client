import { EditOutlined } from "@mui/icons-material";
import { Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getPlayerTests, switchTestStatus } from "../../api/playerTest";
import CreateImportButtonGroup from "../../components/reusable/CreateImportButtonGroup";
import { LoadingTable } from "../../components/reusable/Loading";
import NavTabs from "../../components/reusable/NavTabs";
import SearchField from "../../components/reusable/SearchField";
import DataTable from "../../components/reusable/Table";
import { useRowActions } from "../../hooks/useRowActions";
import { convertSearchParamsToObj } from "../../utils/common";
import { formatTimestamp } from "../../utils/formatTime";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const PlayerTest = () => {
  const { t } = useTranslation();
  const { handleEditRow } = useRowActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTestQuery: any = convertSearchParamsToObj(searchParams);
  const [loading, setLoading] = useState<boolean>(true);
  const [tests, setTests] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const handleStatusChange = async (id: any, status: any) => {
    const response = await switchTestStatus(id, status);
    if (response.status === 200) {
      toast.error(t("toast.switchStatusSuccess"));
    } else {
      toast.error(t("toast.switchStatusFail"));
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Test name", flex: 1, sortable: false },
    {
      field: "country",
      headerName: "Country",
      valueGetter: (value, row) => row.country.name,
      flex: 1,
      sortable: false,
    },
    {
      field: "topic",
      headerName: "Topic",
      flex: 1,
      valueGetter: (value, row) => row.topic.name,
      sortable: false,
    },
    {
      field: "createdBy",
      headerName: "Creator",
      flex: 1,
      valueGetter: (value, row) => row.createdBy.name,
      sortable: false,
    },
    {
      field: "questionId",
      headerName: "No. of questions",
      flex: 1,
      align: "center",
      valueGetter: (value, row) =>
        row.questionsId ? row.questionsId.length : "N/A",
      sortable: false,
    },
    { field: "createdAt", headerName: "Created At", flex: 1, sortable: false },
    { field: "updatedAt", headerName: "Updated At", flex: 1, sortable: false },
    {
      field: "status",
      flex: 0,
      sortable: false,
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
      headerName: "Edit test",
      width: 100,
      flex: 0,
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditRow(params.id.toString(), "playertest")}
          color="primary"
          aria-label="delete"
        >
          <EditOutlined />
        </IconButton>
      ),
    },
  ];

  const fetchTests = async (page: number, pageSize: number) => {
    setIsTableLoading(true);
    try {
      const response = await getPlayerTests({
        ...searchTestQuery,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });
      const testsData = response.data.data.tests;
      const formattedTests = testsData.map((test: any) => ({
        ...test,
        createdAt: formatTimestamp(test.createdAt),
        updatedAt: formatTimestamp(test.updatedAt),
      }));
      const totalRows = response.data.data.totalCount;
      console.log(testsData);
      setTests(formattedTests);
      setRowCount(totalRows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchTests(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  if (loading) {
    return <LoadingTable />;
  }

  return (
    <>
      <h1>Test Dashboard</h1>
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
              setSearchParams({ ...searchTestQuery, status: value })
            }
            value={searchTestQuery.status || ""}
          />
          <SearchField
            label="Search test"
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchTestQuery, search: value.trim() })
            }
          />
        </Box>
        <CreateImportButtonGroup createPath="/createtest" importPath="/" />
      </Box>
      <DataTable
        isLoading={isTableLoading}
        columns={columns}
        rows={tests}
        getRowId={(row) => row._id}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PlayerTest;
