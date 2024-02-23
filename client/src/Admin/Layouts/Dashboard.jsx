import React, { useEffect, useState } from "react";
import Topbar from "../Components/Topbar";
import { tokens } from "../theme";
import {
  Avatar,
  Box,
  Button,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  colors,
} from "@mui/material";
import StatBox from "../Components/StatBox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CategoryIcon from "@mui/icons-material/Category";
import { useTheme } from "@emotion/react";
import LineChart from "../Components/BasicLineChart";
import BasicPieChart from "../Components/BasicPieChart";
import BasicBarGraph from "../Components/BasicBarGraph";
import { useSelector } from 'react-redux';
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [amount, setAmount] = useState(0);
  const verifyToken = useSelector((state) => state.auth.userToken);
  const [formattedData, setFormattedData] = useState(null);

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:8000/profile/admin/getDashboardContents`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": verifyToken,
        },
      }
    );
    const json = await response.json();
    setFormattedData(json);
  };
  const addExpenseFunction = async () => {
    const response = await fetch(
      `http://localhost:8000/profile/admin/addExpenses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": verifyToken,
        },
        body: JSON.stringify({
          amount: amount
        })
      }
    );
    fetchData();
    setAmount(0);

  }
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        fontSize: "large",
        height: "40px",
        width: "40px",
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
      height="100vh"
      overflow="auto"
    >
      <Box width={"98%"}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Topbar title="Dashboard" message="Find all your customers here!" />
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12,1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          <Box
            gridColumn="span 3"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              backgroundColor: colors.primary[400],
            }}
          >
            {formattedData && (
              <StatBox
                title={formattedData.totalViews}
                subtitle="Total Views"
                progress="0.75"
                increase="+14%"
                icon={
                  <RemoveRedEyeIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {formattedData && (
              <StatBox
                title={`Rs. ${formattedData.totalSales}`}
                subtitle="Sales Obtained"
                progress="0.50"
                increase="+21%"
                icon={
                  <AttachMoneyIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {formattedData && (
              <StatBox
                title={`Rs. ${formattedData.totalExpenses}`}
                subtitle="Total Expenses"
                progress="0.50"
                increase="+21%"
                icon={
                  <AttachMoneyIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {formattedData && (
              <StatBox
                title={formattedData.totalProducts}
                subtitle="Total Products"
                progress="0.50"
                increase="+21%"
                icon={
                  <CategoryIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            )}
          </Box>
        </Box>
        <Stack
          sx={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
            height: "400px",
          }}
        >
          <Box
            backgroundColor={colors.primary[400]}
            sx={{
              width: "70%",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Box
              p="0 30px"
              display="flex "
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box width="100%">
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                  marginTop="25px"
                  width="100%"
                >
                  Revenue Generated
                </Typography>
                {formattedData && (
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    Rs. {formattedData.totalSales}
                  </Typography>
                )}
              </Box>
            </Box>
            {formattedData && (
              <Box
                height="310px"
                width="100%"
                m="30px 0 0 0"
                display="flex"
                justifyContent="center"
                alignItems="center"
                paddingBottom="30px"
              >
                <LineChart salesData={formattedData.salesData} width="100%" />
              </Box>
            )}
          </Box>
          <Box
            width="29%"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            height="100%"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Top Users (Based on sales)
              </Typography>
            </Box>
            {formattedData &&
              formattedData.topUsers.map((u, ind) => (
                <Box key={ind}>
                  {ind > 0 && <Divider variant="middle" />}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    colors={colors.grey[100]}
                    p="5px"
                  >
                    <Stack
                      sx={{
                        height: "80px",
                        width: "100%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <Stack
                        sx={{
                          justifyContent: "center",
                          alignItems: "center",
                          width: "10%",
                        }}
                      >
                        <Avatar {...stringAvatar(u.name)} />
                      </Stack>
                      <Stack
                        sx={{
                          width: "45%",
                          justifyContent: "space-evenly",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography sx={{ fontSize: "medium" }}>
                          {u.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "small",
                            color: colors.greenAccent[500],
                          }}
                        >
                          {u.email}
                        </Typography>
                      </Stack>
                      <Stack
                        sx={{
                          width: "25%",
                          justifyContent: "flex-end",
                          alignItems: "flex-start",
                          flexDirection: "row",
                        }}
                      >
                        <Button
                          color="success"
                          variant="contained"
                          sx={{ backgroundColor: colors.greenAccent[500] }}
                        >
                          Rs. {u.moneyspent}
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              ))}
          </Box>
        </Stack>
        <Stack
          sx={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "30px",
            marginBottom: "20px",
            height: "300px",
          }}
        >
          <Stack
            sx={{
              width: "70%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              backgroundColor={colors.primary[400]}
              sx={{
                width: "49%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Box
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
                width="100%"
              >
                <Box width="100%">
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                    marginTop="25px"
                    width="100%"
                  >
                    Order Details
                  </Typography>
                  {formattedData && (
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      color={colors.greenAccent[500]}
                    >
                      Total Orders Count :{" "}
                      {formattedData.ordersData[0].value +
                        formattedData.ordersData[1].value +
                        formattedData.ordersData[2].value}{" "}
                      /-
                    </Typography>
                  )}
                  {formattedData && (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <BasicPieChart data={formattedData.ordersData} />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              backgroundColor={colors.primary[400]}
              sx={{
                width: "49%",
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {formattedData && (
                <BasicBarGraph data={formattedData.productsData} />
              )}
            </Box>
          </Stack>
          <Stack
            width="29%"
            backgroundColor={colors.primary[400]}
            height="100%"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              colors={colors.grey[100]}
              p="15px"
            >
              <Typography
                color={colors.grey[100]}
                variant="h5"
                fontWeight="600"
              >
                Add Expenses
              </Typography>
            </Box>
            <Stack
              sx={{
                width: "100%",
                height: "250px",
                overflow: "auto",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack
                sx={{
                  width: "90%",
                  marginTop: "10px",
                }}
              >
                <TextField
                  variant="filled"
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(evt) => setAmount(evt.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {/* <CurrencyRupeeIcon /> */}
                        Rs.
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack
                sx={{
                  width: "90%",
                  marginTop: "10px",
                }}
              >
                <TextField variant="filled" label="Note" />
              </Stack>
              <Stack
                sx={{
                  width: "90%",
                  marginTop: "10px",
                }}
              >
                <Button variant="contained" onClick={addExpenseFunction}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    color: colors.grey[800],
                  }}
                >
                  Add Expense
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default Dashboard;
