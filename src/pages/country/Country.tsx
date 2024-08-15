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
import { getCountries, switchCountryStatus } from "../../api/country";
import { formatTimestamp } from "../../utils/formatTime";

const Country = () => {
  const { handleSwitchChange, handleEditRow } = useRowActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchCountryQuery = convertSearchParamsToObj(searchParams);
  const [loading, setLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const handleStatusChange = async (id: any, status: any) => {
      const response = await switchCountryStatus(id, status);
      console.log(response)
  };
  

  const columns: GridColDef[] = [
    { field: "name", headerName: "Country name", flex: 1 },
    { field: "description", headerName: "Description",  flex: 3},
    { field: "createdAt", headerName: "Created At",  flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
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
      headerName: "Edit country",
      width: 100,
      flex: 0,
      align:"right",
      sortable: false,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleEditRow(params.id.toString(), "country")}
          color="primary"
          aria-label="delete"
        >
          <EditOutlined />
        </IconButton>
      ),
    },
  ];

  const fetchCountries = async (page: number, pageSize: number) => {
    try {
      const response = await getCountries({
        ...searchCountryQuery,
        page: paginationModel.page + 1,
        pageSize: paginationModel.pageSize,
      });
      const countriesData = response.data.data.countries;
      const formattedCountries = countriesData.map((country: any) => ({
        ...country,
        createdAt: formatTimestamp(country.createdAt),
        updatedAt: formatTimestamp(country.updatedAt),
      }));
      const totalRows = response.data.data.totalCount;
      console.log(countriesData);
      setCountries(formattedCountries);
      setRowCount(totalRows);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCountries(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
    fetchCountries(model.page, model.pageSize);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>Country Dashboard</h1>
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
              setSearchParams({ ...searchCountryQuery, status: value })
            }
            value=""
          />
          <SearchField
            label="Search country"
            delay={1500}
            onChange={(value: any) =>
              setSearchParams({ ...searchCountryQuery, search: value })
            }
          />
        </Box>
        <CreateImportButtonGroup createPath="/createcountry" importPath="/" />
      </Box>
      <DataTable
        columns={columns}
        rows={countries}
        getRowId={(row) => row._id}
        rowCount={rowCount}
        paginationModel={paginationModel}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Country;
