import { EditOutlined } from "@mui/icons-material";
import { Box, Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CreateImportButtonGroup from "../../components/reusable/CreateImportButtonGroup";
import NavTabs from "../../components/reusable/NavTabs";
import SearchField from "../../components/reusable/SearchField";
import DataTable from "../../components/reusable/Table";
import { useRowActions } from "../../hooks/useRowActions";
import { convertSearchParamsToObj } from "../../utils/common";
import { formatTimestamp } from "../../utils/formatTime";
import { LoadingTable } from "../../components/reusable/Loading";
import { getDocuments, switchDocumentStatus } from "../../api/documentation";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Documentation = () => {
  const { t } = useTranslation();
  const { handleEditRow } = useRowActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchDocumentationQuery: any = convertSearchParamsToObj(searchParams);
  const [loading, setLoading] = useState<boolean>(true);
  const [documents, setDocuments] = useState<any[]>([]);
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
      const response = await switchDocumentStatus(id, status);
      if (response.status === 200) {
        toast.success(t("toast.switchStatusSuccess"));
        fetchDocuments(paginationModel.page, paginationModel.pageSize);
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
    {
      field: "name",
      headerName: t("documentationDashboard.table.documentName"),
      flex: 1,
      sortable: false,
    },
    {
      field: "country",
      headerName: t("country"),
      flex: 1,
      sortable: false,
      valueGetter: (value, row) => row.country.name,
    },
    {
      field: "topic",
      headerName: t("topic"),
      flex: 1,
      sortable: false,
      valueGetter: (value, row) => row.topic.name,
    },
    {
      field: "source",
      headerName: t("documentationDashboard.table.source"),
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link
            to={params.row.source}
            target="_blank"
            rel="noopener noreferrer"
          >
            Link
          </Link>
        );
      },
    },

    {
      field: "createdAt",
      headerName: t("createdAt"),
      flex: 1,
      sortable: false,
    },
    {
      field: "updatedAt",
      headerName: t("updatedAt"),
      flex: 1,
      sortable: false,
    },
    {
      field: "status",
      flex: 0,
      sortable: false,
      headerName: t("status"),
      description:
        "This column allows users to switch the status of the data (aka soft delete).",
      width: 90,
      renderCell: (params) => {
        console.log(params);
        return (
          <Switch
            disabled={loadingStatus}
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
      headerName: t("edit"),
      width: 100,
      flex: 0,
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditRow(params.id.toString(), "documentation")}
          color="primary"
          aria-label="delete"
        >
          <EditOutlined />
        </IconButton>
      ),
    },
  ];

  const fetchDocuments = async (page: number, pageSize: number) => {
    setIsTableLoading(true);
    try {
      const response = await getDocuments({
        ...searchDocumentationQuery,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });
      const documentsData = response.data.data.documentations;
      const formattedDocuments = documentsData.map((document: any) => ({
        ...document,
        createdAt: formatTimestamp(document.createdAt),
        updatedAt: formatTimestamp(document.updatedAt),
      }));
      const totalRows = response.data.data.totalCount;
      console.log(documentsData);
      setDocuments(formattedDocuments);
      setRowCount(totalRows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  if (loading) {
    return <LoadingTable />;
  }
  return (
    <>
      <h1>{t("documentationDashboard.title")}</h1>
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
              setSearchParams({ ...searchDocumentationQuery, status: value })
            }
            value={searchDocumentationQuery.status}
          />
          <SearchField
            label={`${t("search")} ${t("documentationDashboard.documentation")}`}
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({
                ...searchDocumentationQuery,
                search: value.trim(),
              })
            }
          />
        </Box>
        <CreateImportButtonGroup createPath="/createdocumentation" />
      </Box>
      <DataTable
        isLoading={isTableLoading}
        columns={columns}
        rows={documents}
        getRowId={(row) => row._id}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Documentation;
