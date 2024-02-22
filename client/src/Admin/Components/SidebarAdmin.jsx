import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation, useHistory } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined'; 
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ReceiptOutlined from "@mui/icons-material/ReceiptOutlined";
import ProductionQuantityLimitsOutlinedIcon from '@mui/icons-material/ProductionQuantityLimitsOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.grey[100],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const SubMenuDivider = ({ title, isCollapsed }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const fontSize = isCollapsed ? "10px" : "default";
    console.log(title, isCollapsed);
    return (
        <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
            fontSize={fontSize}
            textTransform="uppercase"
        >
            {title}
        </Typography>
    )
}

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const location = useLocation();
    const [selected, setSelected] = useState("Dashboard");

    const history = useHistory();

    const goToHome = () => {
        history.push("/");
    }
    useEffect(() => {
        const lastPath = location.pathname.slice(7);
        const selectedTitle = lastPath.charAt(0).toUpperCase() + lastPath.slice(1);
        setSelected(selectedTitle);
    }, []);
    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
            height="100vh"
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.grey[100]} fontSize="20px" fontWeight="700"
                                        onClick={goToHome}>
                                    PETSPARADISE
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.grey[100]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                    paddingBottom="10px"
                                >
                                    KOUSHIK
                                </Typography>
                                <Typography variant="h5" color={colors.greenAccent[500]}>
                                    Pets Paradise Admin
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                        <Item
                            title="Dashboard"
                            to="/admin/dashboard"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <SubMenuDivider title="Records" isCollapsed={isCollapsed} />
                        <Item
                            title="Customers"
                            to="/admin/customers"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Employees"
                            to="/admin/employees"
                            icon={<PeopleOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Products"
                            to="/admin/products"
                            icon={<ProductionQuantityLimitsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <SubMenuDivider title="Sales" isCollapsed={isCollapsed} />

                        <Item
                            title="Orders"
                            to="/admin/orders"
                            icon={<PaidOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Transactions"
                            to="/admin/transactions"
                            icon={<ReceiptOutlined />}
                            selected={selected}
                            setSelected={setSelected}
                        />

                        <SubMenuDivider title="Contacts" isCollapsed={isCollapsed} />

                        <Item
                            title="Feebacks"
                            to="/admin/feedback"
                            icon={<FeedbackOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Announcement"
                            to="/admin/announcements"
                            icon={<ContactsOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
