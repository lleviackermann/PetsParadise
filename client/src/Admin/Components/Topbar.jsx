import React from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { tokens } from "../theme";
import { authActions } from '../../store/auth-slice';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";

const Topbar = ({ title, message }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const colors = tokens(theme.palette.mode);
    const history = useHistory();
    const logOut = () => {
        dispatch(authActions.logout());
        console.log("logging out");
        history.push("/");
    }

    return (
        <Box display="flex" justifyContent="space-between" width="100%" paddingTop="1rem"
            sx={{
                background: "transparent",
            }}>
            <Box mb="30px" paddingLeft="1rem">
                <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "0 0 5px 0" }}
                >
                    {title}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[400]}>
                    {message}
                </Typography>
            </Box>
            <Box display="flex" gap="1rem" justifyContent="center" alignItems="flex-start" 
                marginRight="2rem">
                <Box display="flex" gap="1rem" marginRight="1rem">
                    <Box textAlign="center">
                        <Typography variant="h3" marginTop="13px">
                            Koushik Kumar
                        </Typography>
                    </Box>
                    <Box mt="5px">
                        <img  
                        src="https://images.unsplash.com/photo-1708452722875-04779d4704b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" 
                        height="50px"
                        width="50px"
                        style={{
                            borderRadius: "50%",
                        }}
                        />
                    </Box>
                </Box>
                <Button sx={{
                    backgroundColor: "#3da58a",
                    padding: "10px 10px",
                    color: "white",
                    marginTop: "5px"
                }} onClick={logOut}>
                    Logout
                </Button>
            </Box>
        </Box>
    )
}

export default Topbar