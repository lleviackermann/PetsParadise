import React, { useEffect, useState } from 'react'
import Topbar from "../Components/Topbar";
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, useGridApiRef } from "@mui/x-data-grid";
import { tokens } from '../theme';
import { feedbackColumnsData } from "../columnsData";
import { useSelector } from 'react-redux';

const Feedback = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const apiRef = useGridApiRef();
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const verifyToken = useSelector((state) => state.auth.userToken);

  const getData = async() => {
    try {
      const response = await fetch('http://localhost:8000/profile/admin/getAllFeedbacks', {
        method: 'GET',
        headers: {
          "Authorization": verifyToken,
        }
      });   
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAllFeedbacks(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  useEffect(() => {
    getData();
  }, []);

  const deleteSelectedRows = () => {
    apiRef.current.getSelectedRows().forEach((value) => {console.log(value.id)});
  }

  return (
    <Box sx={{height: "100vh",overflow: "auto"}}>
      <Topbar title="Feedbacks" message="See Feedbacks of your users!" />
      <Box display="flex" justifyContent="space-between" alignContent="center">
        <Box marginLeft="1rem" padding="8px"
          fontStyle="bold" width="fit-content" borderBottom="2px solid" borderColor={colors.greenAccent[400]}
          display="flex" justifyContent="center" alignContent="center"
        >
          <Typography variant='h3' fontSize="30px" fontWeight="700">Feedbacks</Typography>
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
            rows={allFeedbacks}
            columns={feedbackColumnsData}
            apiRef={apiRef}
            disableColumnSelector
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Feedback