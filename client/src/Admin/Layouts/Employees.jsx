import React, { useEffect, useState } from 'react'
import Topbar from "../Components/Topbar";
import { Box, Typography, useTheme, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { tokens } from '../theme';
import { employeeColumnsData } from "../columnsData";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { baseURL } from '../../api/api';

const Employees = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const apiRef = useGridApiRef();
  const history = useHistory();
  const [allEmployees, setAllEmployees] = useState([]);
  const verifyToken = useSelector((state) => state.auth.userToken);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isCheckBoxDisabled, setIsCheckBoxDisabled] = useState(false);

  const getData = async () => {
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

  const goToAddEmployee = () => {
    history.push("/admin/addEmployee")
  };

  const deleteSelectedRows = async () => {
    const employeesIdToDelete = [];
    apiRef.current.getSelectedRows().forEach((value) => { employeesIdToDelete.push(value.id) });
    try {
      const response = await fetch(`${baseURL}profile/admin/remove-employees`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": verifyToken,
        },
        body: JSON.stringify({
          employeesIdToDelete
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllEmployees(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(allEmployees.length)
    if (allEmployees.length > 4) setIsCheckBoxDisabled(false);
    else setIsCheckBoxDisabled(true);
  }, [allEmployees]);

  useEffect(() => {
    console.log(allEmployees.length)
    if (allEmployees.length > 4) setIsCheckBoxDisabled(false);
    else setIsCheckBoxDisabled(true);
  }, []);

  const changeRowsCount = () => {
    const updatedCount = Number(apiRef.current.getSelectedRows().size);
    if (updatedCount > 0) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  }

  const buttonStyle = isButtonDisabled ? { cursor: 'not-allowed', fontSize: "1rem" } : { fontSize: "1rem" };

  return (
    <Box sx={{ height: "100vh", overflow: "auto" }}>
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
        }} onClick={goToAddEmployee}>+ Add Employee </button>
      </Box>
      <Box m="20px">
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          style={buttonStyle}
          color='error'
          onClick={deleteSelectedRows}
          disabled={isButtonDisabled}
        >
          <b>Delete The Selected Employees </b>
        </Button>
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
          {isCheckBoxDisabled &&
            <DataGrid
              autoHeight
              getRowHeight={() => 'auto'}
              rows={allEmployees}
              columns={employeeColumnsData}
              apiRef={apiRef}
              onRowSelectionModelChange={changeRowsCount}
              disableColumnSelector
              disableRowSelectionOnClick
            />}
          {!isCheckBoxDisabled &&
            <DataGrid
              autoHeight
              getRowHeight={() => 'auto'}
              rows={allEmployees}
              columns={employeeColumnsData}
              apiRef={apiRef}
              checkboxSelection
              onRowSelectionModelChange={changeRowsCount}
              disableColumnSelector
              disableRowSelectionOnClick
            />}
        </Box>
      </Box>
    </Box>
  )
}

export default Employees