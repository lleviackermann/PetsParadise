import { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar from "../Components/SidebarAdmin";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import Dashboard from "../Layouts/Dashboard"
import Employees from "../Layouts/Employees"
import Users from "../Layouts/Users"
import Feedback from "../Layouts/Feedback"
import Products from "../Layouts/Products"
import Transactions from "../Layouts/Dashboard"
import Announcements from "../Layouts/Announcements"
import Orders from "../Layouts/Orders"
import SendMessages from "../Layouts/SendMessages";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  console.log("hi we are in admin routes")

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex">
          <Sidebar isSidebar={isSidebar} />
          <Box width="100%">
            <Switch>
              <Route path="/admin/dashboard" exact>
                <Dashboard />
              </Route>
              <Route path="/admin/employees" exact>
                <Employees />
              </Route>
              <Route path="/admin/customers" exact>
                <Users />
              </Route>
              <Route path="/admin/products" exact>
                <Products />
              </Route>
              <Route path="/admin/feedback" exact>
                <Feedback />
              </Route>
              <Route path="/admin/transactions" exact>
                <Transactions />
              </Route>
              <Route path="/admin/orders" exact>
                <Orders />
              </Route>
              <Route path="/admin/announcements" exact>
                <Announcements />
              </Route>
              <Route path="/admin/sendmessages" exact>
                <SendMessages />
              </Route>
            </Switch>
          </Box>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;