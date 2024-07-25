import { Box } from '@mui/material'
import React from 'react'
import NavTabs from '../../components/reusable/NavTabs'
import SearchField from '../../components/reusable/SearchField'
import CreateImportButtonGroup from '../../components/reusable/CreateImportButtonGroup'
import DataTable from '../../components/reusable/Table'

const Role = () => {
  return (
    <>
      <h1>Role</h1>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <NavTabs />
          <SearchField label="Search role" />
        </Box>
        <CreateImportButtonGroup createPath="/createrole" importPath="/" />
      </Box>
      <DataTable />
    </>
  )
}

export default Role