import React from 'react'
import Topbar from "../Components/Topbar";
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from '../theme';
import { useHistory } from 'react-router-dom'

const Announcements = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const history = useHistory();


  const columns = [
    { field: "id", headerName: "ID", align: "center", },
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
      field: "userType",
      headerName: "UserType",
      flex: 0.5,
      headerAlign: 'center',
      align: "center",
    },
    {
      field: "message",
      headerName: "Message",
      flex: 2,
      headerAlign: 'center',
      align: "center",
    },
  ];

  const messages = [
    {
      id: 1,
      name: "Suprit kumar",
      email: "Hello",
      userType: "All",
      message: "Hello, and welcome to my website",
    },
    {
      id: 2,
      name: "Suprit kumar",
      email: "Hello",
      userType: "All",
      message: "Hello, and welcome to my website",
    },
    {
      id: 3,
      name: "Suprit kumar",
      email: "Hello",
      userType: "All",
      message: "Hello, and welcome to my website, Hello, and welcome to my website, Hello, and welcome to my website  Hello, and welcome to my website",
    },
    {
      id: 4,
      name: "Suprit kumar",
      email: "Hello",
      userType: "All",
      message: "Hello, and welcome to my website",
    },
  ]

  const handleClick = () => {
    history.push("/admin/sendmessages");
  }


  return (
    <>
      <Topbar title="Announcements" message="Check your messages!" />
      <Box display="flex" justifyContent="space-between">
        <Box marginLeft="1rem" padding="4px"  
        fontStyle="bold" width="fit-content" borderBottom="2px solid" borderColor={colors.greenAccent[400]}
        display="flex" justifyContent="center" alignContent="center"
        >
          <Typography variant='h3'>Your Messages</Typography>
        </Box>
        <button style={{
          padding: "10px 20px",
          cursor: "pointer",
          fontSize: 22,
          color: "white",
          border: "3px",
          borderColor: colors.greenAccent[400],
          borderStyle: "dashed",
          marginRight: "2rem",
          background: "transparent",
          borderRadius: "10px",
          borderSpacing: "1px"
        }} onClick={handleClick}>+ Send Messages</button>
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
              fontSize: 22,
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
          />
        </Box>
      </Box>
    </>
  )
}

export default Announcements