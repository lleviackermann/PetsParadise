import React, { useState } from 'react'
import Topbar from '../Components/Topbar';
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { baseURL } from '../../api/api';
import { useSelector } from 'react-redux';
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const checkoutSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    employeeId: yup.string().required("EmployeeId is required!"),
    password: yup
        .string()
        .matches(passwordRules, { message: "Password should contain min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit" })
        .required("Required"),
    role: yup.string().required("Please enter the role of the employee")
});

const initialValues = {
    name: "",
    email: "",
    employeeId: "",
    password: "",
    role: '',
};

const AddEmployee = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const verifyToken = useSelector((state) => state.auth.userToken);


    const handleFormSubmit = async (values, { resetForm }) => {
        const response = await fetch(
            `${baseURL}profile/admin/add-employee`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": verifyToken,
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    employeeId: values.employeeId,
                    password: values.password,
                    role: values.role
                })
            }
        );

        resetForm();
    };

    const roleArray = ["orders", "manager", "appointments"];

    return (
        <Box sx={{ height: "100vh", overflow: "auto" }}>
            <Topbar title="Add Employee" message="Increase your employees " />
            <Box m="20px">
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={checkoutSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="name"
                                    autoComplete='off'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    autoComplete='off'
                                    label="email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    autoComplete='off'
                                    label="employeeId"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.employeeId}
                                    name="employeeId"
                                    error={!!touched.employeeId && !!errors.employeeId}
                                    helperText={touched.employeeId && errors.employeeId}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    autoComplete='off'
                                    label="password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <Box sx={{ gridColumn: "span 4" }}>
                                    <FormControl fullWidth>
                                    <InputLabel id="employee-role-label">Role</InputLabel>
                                    <Select
                                        fullWidth
                                        variant="filled"
                                        autoComplete='off'
                                        labelId="employee-role-label"
                                        label="Role"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.role}
                                        name="role"
                                        error={!!touched.role && !!errors.role}
                                        helperText={touched.role && errors.role}
                                        sx={{ gridColumn: "span 4" }}
                                    >
                                        {roleArray.map(role => (
                                            <MenuItem key={role} value={role} >{role}</MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Add Employee
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    )
}

export default AddEmployee