import React, { useEffect, useState } from 'react'
import Topbar from "../Components/Topbar";
import { Box, Button, Typography, useTheme } from '@mui/material';
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { tokens } from '../theme';
import { ordersColumnData } from "../columnsData";
import { useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const apiRef = useGridApiRef();
  const [allOrders, setAllOrders] = useState([]);
  const verifyToken = useSelector((state) => state.auth.userToken);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8000/profile/admin/getAllOrders', {
        method: 'GET',
        headers: {
          "Authorization": verifyToken,
        }
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllOrders(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const deleteSelectedRows = async () => {
    const idToDelete = [];
    apiRef.current.getSelectedRows().forEach((value) => { idToDelete.push(value.id) });
    console.log(idToDelete);
    try {
      const response = await fetch('http://localhost:8000/profile/admin/deleteOrders', {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "Authorization": verifyToken,
        },
        body: JSON.stringify({
          idToDelete: idToDelete
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllOrders(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const changeRowsCount = () => {
    const updatedCount = Number(apiRef.current.getSelectedRows().size);
    if(updatedCount > 0) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  }

  const buttonStyle = isButtonDisabled ? { cursor: 'not-allowed', fontSize: "1rem" } : {fontSize: "1rem"};

  return (
    <Box sx={{ height: "100vh", overflow: "auto" }}>
      <Topbar title="Orders" message="Find all orders here!" />
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Box marginLeft="1rem" padding="8px"
          fontStyle="bold" width="fit-content" borderBottom="2px solid" borderColor={colors.greenAccent[400]}
          display="flex" justifyContent="center" alignContent="center"
        >
          <Typography variant='h3' fontSize="30px" fontWeight="700">Your Orders</Typography>
        </Box>
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
          <b>Delete The Selected Orders</b>
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
          <DataGrid
            autoHeight
            getRowHeight={() => 'auto'}
            rows={allOrders}
            columns={ordersColumnData}
            apiRef={apiRef}
            disableColumnSelector
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Orders