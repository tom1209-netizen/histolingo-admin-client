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
import { getTopics, switchTopicStatus } from "../../api/topic";
import { LoadingTable } from "../../components/reusable/Loading";
import { no_img } from "../../constant/image";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Topic = () => {
  const { t } = useTranslation();
  const { handleEditRow } = useRowActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [topics, setTopics] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTopicQuery: any = convertSearchParamsToObj(searchParams);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const handleStatusChange = async (id: any, status: any) => {
    const response = await switchTopicStatus(id, status);
    if (response.status === 200) {
      toast.success(t("toast.switchStatusSuccess"));
    } else {
      toast.error(t("toast.switchStatusFail"));
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: t("topicDashboard.table.topicName"), flex: 1, sortable: false },
    {
      field: "description",
      headerName: t("description"),
      flex: 3,
      sortable: false,
    },
    {
      field: "country",
      headerName: t("country"),
      flex: 1,
      sortable: false,
      valueGetter: (value, row) => (row.country ? row.country.name : "N/A"),
    },
    {
      field: "image",
      headerName: t("image"),
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <img
          src={params.row.image || no_img}
          alt={params.row.name}
          style={{
            width: 80,
            height: 50,
            objectFit: "cover",
            borderRadius: 5,
            border: "1px solid #ccc",
          }}
        />
      ),
    },
    { field: "createdAt", headerName: t("createdAt"), flex: 1, sortable: false },
    { field: "updatedAt", headerName: t("updatedAt"), flex: 1, sortable: false },
    {
      field: "status",
      headerName: t("status"),
      flex: 0,
      sortable: false,
      description:
        "This column allows users to switch the status of the data (aka soft delete).",
      width: 90,
      renderCell: (params) => (
        <Switch
          defaultChecked={params.row.status == 1}
          onChange={() =>
            handleStatusChange(params.row._id, params.row.status == 1 ? 0 : 1)
          }
        />
      ),
    },
    {
      field: "edit",
      headerName: t("edit"),
      flex: 0,
      width: 100,
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditRow(params.id.toString(), "topic")}
          color="primary"
          aria-label="delete"
        >
          <EditOutlined />
        </IconButton>
      ),
    },
  ];

  const fetchTopics = async (page: number, pageSize: number) => {
    setIsTableLoading(true);
    try {
      const response = await getTopics({
        ...searchTopicQuery,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });
      const topicsData = response.data.data.topics;
      const formattedTopics = topicsData.map((topic: any) => ({
        ...topic,
        createdAt: formatTimestamp(topic.createdAt),
        updatedAt: formatTimestamp(topic.updatedAt),
      }));

      console.log(formattedTopics);
      setRowCount(response.data.data.totalTopics);
      setTopics(formattedTopics);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics(paginationModel.page, paginationModel.pageSize);
  }, [searchParams, paginationModel]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
    fetchTopics(model.page, model.pageSize);
  };

  if (loading) {
    return <LoadingTable />;
  }

  return (
    <>
      <h1>{t("topicDashboard.title")}</h1>
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
              setSearchParams({ ...searchTopicQuery, status: value })
            }
            value={searchTopicQuery.status}
          />
          <SearchField
            label={`${t("search")} ${t("topicDashboard.topic")}`}
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchTopicQuery, search: value.trim() })
            }
          />
        </Box>
        <CreateImportButtonGroup createPath="/createtopic" />
      </Box>
      <DataTable
        isLoading={isTableLoading}
        columns={columns}
        rows={topics}
        getRowId={(row) => row._id}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Topic;
