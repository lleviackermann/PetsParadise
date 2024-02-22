import React from 'react'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Box, Typography, useTheme } from '@mui/material';
import { tokens } from "../theme";
const Topbar = ({ title, message }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
            <Box display="flex" gap="1rem" marginRight="2rem">
                <Typography variant="h3">Koushik Kumar</Typography>
                <Box height="2rem" width="2rem" mt="5px">
                    <AccountCircleOutlinedIcon />
                </Box>
            </Box>
        </Box>
    )
}

export default Topbar