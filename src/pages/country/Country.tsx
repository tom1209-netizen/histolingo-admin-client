import { EditOutlined } from "@mui/icons-material";
import { Box, Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCountries, switchCountryStatus } from "../../api/country";
import CreateImportButtonGroup from "../../components/reusable/CreateImportButtonGroup";
import NavTabs from "../../components/reusable/NavTabs";
import SearchField from "../../components/reusable/SearchField";
import DataTable from "../../components/reusable/Table";
import { useRowActions } from "../../hooks/useRowActions";
import { convertSearchParamsToObj } from "../../utils/common";
import { formatTimestamp } from "../../utils/formatTime";
import { LoadingTable } from "../../components/reusable/Loading";
import { toast } from "react-toastify";
import { no_img } from "../../constant/image";

const Country = () => {
  const { handleEditRow } = useRowActions();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchCountryQuery: any = convertSearchParamsToObj(searchParams);
  const [loading, setLoading] = useState<boolean>(true);
  const [countries, setCountries] = useState<any[]>([]);
  const [rowCount, setRowCount] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const [isTableLoading, setIsTableLoading] = useState<boolean>(false);

  const handleStatusChange = async (id: any, status: any) => {
    const response = await switchCountryStatus(id, status);
    if (response.status === 200) {
      toast.success("Status changed successfully");
    } else {
      toast.error("Failed to change status. Please try again.");
    }
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Country name", flex: 1, sortable: false },
    {
      field: "description",
      headerName: "Description",
      flex: 3,
      sortable: false,
    },
    {
      field: "image",
      headerName: "Image",
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
      headerName: "Edit country",
      width: 100,
      flex: 0,
      align: "center",
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
    setIsTableLoading(true);
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
      setIsTableLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel, searchParams]);

  const handlePageChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  if (loading) {
    return <LoadingTable />;
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
            value={searchCountryQuery.status || ""}
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
        isLoading={isTableLoading}
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
