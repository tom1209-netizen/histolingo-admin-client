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
import { getTopics } from "../../api/topic";

const Topic = () => {
  const { handleSwitchChange, handleEditRow } = useRowActions();
  const [loading, setLoading] = useState<boolean>(true);
  const [topics, setTopics] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTopicQuery = convertSearchParamsToObj(searchParams);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Topic name", width: 200 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "countryId", headerName: "Country", width: 200 },
    { field: "createdAt", headerName: "Created At", width: 130 },
    { field: "updatedAt", headerName: "Updated At", width: 130 },
    {
      field: "status",
      headerName: "Status",
      description:
        "This column allows users to switch the status of the data (aka soft delete).",
      width: 90,
      renderCell: (params) => <Switch />,
    },
    {
      field: "edit",
      headerName: "Edit topic",
      width: 100,
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
    try {
      const response = await getTopics(searchTopicQuery);
      const topicsData = response.data.data.topics;
      const formattedTopics = topicsData.map((topic: any) => ({
        ...topic,
        createdAt: formatTimestamp(topic.createdAt),
        updatedAt: formatTimestamp(topic.updatedAt),
      }));

      console.log(topicsData);
      setRowCount(response.data.data.totalTopics);
      setTopics(formattedTopics);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>Topic Dashboard</h1>
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
            value=""
          />
          <SearchField
            label="Search topic"
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchTopicQuery, search: value })
            }
          />
        </Box>
        <CreateImportButtonGroup createPath="/createtopic" importPath="/" />
      </Box>
      <DataTable
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
