import React, { useEffect, useState } from 'react'
import Topbar from "../Components/Topbar";
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { tokens } from '../theme';
import { employeeColumnsData } from "../columnsData";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

const Employees = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const apiRef = useGridApiRef();
  const history = useHistory();
  const [allEmployees, setAllEmployees] = useState([]);
  const verifyToken = useSelector((state) => state.auth.userToken);

  const getData = async() => {
    try {
      const response = await fetch('http://localhost:8000/profile/admin/getAllEmployee', {
        method: 'GET',
        headers: {
          "Authorization": verifyToken,
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllEmployees(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  useEffect(() => {
    getData();
  }, []);

  const goToAddProduct = () => {
    history.push("/admin/addEmployee")
  };
  const deleteSelectedRows = () => {
    apiRef.current.getSelectedRows().forEach((value) => {console.log(value.id)});
  }

  return (
    <Box sx={{height: "100vh",overflow: "auto"}}>
      <Topbar title="Employees" message="Find all your employees here!" />
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Box marginLeft="1rem" padding="8px"
          fontStyle="bold" width="fit-content" borderBottom="2px solid" borderColor={colors.greenAccent[400]}
          display="flex" justifyContent="center" alignContent="center"
        >
          <Typography variant='h3' fontSize="30px" fontWeight="700">Your Employees</Typography>
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
        }} onClick={goToAddProduct}>+ Add Employee </button>
      </Box>
      <Box m="20px">
        <Box
          m="20px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-row": {
              paddingTop: "22px",
            },
            "& .MuiDataGrid-row .MuiDataGrid-cell": {
              fontSize: 20,
              paddingBottom: "22px",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
              fontSize: 23,
              fontWeight: 700,
              textWrap: "wrap",

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
            rows={allEmployees}
            columns={employeeColumnsData}
            apiRef={apiRef}
            checkboxSelection
            disableColumnSelector
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Employees