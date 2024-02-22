import React, { useState } from 'react'
import Topbar from "../Components/Topbar";
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { tokens } from '../theme';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';


const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const apiRef = useGridApiRef();

  const columns = [
    {
      field: "id",
      headerName: "UserId",
      headerAlign: 'center',
      flex: 1,
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: 'center',
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: 'center',
      align: "center",

    },
    {
      field: "moneyspent",
      headerName: "Money Spent",
      flex: 0.5,
      headerAlign: 'center',
      align: "center",

    },
    {
      field: "appointments",
      headerName: "Appointments",
      flex: 0.8,
      headerAlign: 'center',
      align: "center",

    },
  ];

  const messages = [
    {
      id: 1,
      name: "Suprit kumar",
      email: "Hello",
      moneyspent: 199,
      appointments: 20,
    },
    {
      id: 2,
      name: "Suprit kumar",
      email: "Hello",
      moneyspent: 199,
      appointments: 20,
    },
    {
      id: 3,
      name: "Suprit kumar",
      email: "Hello",
      moneyspent: 199,
      appointments: 20,
    },
    {
      id: 4,
      name: "Suprit kumar",
      email: "Hello",
      moneyspent: 199,
      appointments: 20,
    },
  ]

  const deleteSelectedRows = () => {
    apiRef.current.getSelectedRows().forEach((value) => {console.log(value.id)});
  }

  return (
    <>
      <Topbar title="Customers" message="Find all your customers here!" />
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Box marginLeft="1rem" padding="8px"
          fontStyle="bold" width="fit-content" borderBottom="2px solid" borderColor={colors.greenAccent[400]}
          display="flex" justifyContent="center" alignContent="center"
        >
          <Typography variant='h3'>Your Customers</Typography>
        </Box>
        <Box mr="2rem" display="flex" justifyContent="center"
        alignContent="center" onClick={deleteSelectedRows}>
          <Button variant="contained" color='error' startIcon={<DeleteIcon />}>
            Delete Selected Rows
          </Button>
        </Box>
      </Box>
      <Box m="20px">
        <Box
          m="20px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              // borderBottom: "none",
              fontSize: 18,
              padding: "10px",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
              fontSize: 20,
              fontWeight: 700,
              textWrap: "wrap"
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            autoHeight
            getRowHeight={() => 'auto'}
            checkboxSelection
            rows={messages}
            columns={columns}
            apiRef={apiRef}
          />
        </Box>
      </Box>
    </>
  )
}

export default Users