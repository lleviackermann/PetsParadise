import React, { useState } from 'react'
import Topbar from '../Components/Topbar';
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const checkoutSchema = yup.object().shape({
  id: yup.string().required("required"),
  message: yup.string().required("required"),
});

const initialValues = {
  id: "",
  message: ""
};

const SendMessages = () => {
  const [user, setUser] = useState("Customer");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [customerCss, setCustomerCss] = useState("2px solid #4cceac");
  const [employeeCss, setEmployeeCss] = useState("none");

  const handleFormSubmit = (values, {resetForm}) => {
    console.log(values);
    resetForm();
  };

  const handleUserChange = () => {
    if(user === "Customer") {
      setUser("Employee");
      setCustomerCss("none");
      setEmployeeCss("2px solid #4cceac");
    } else {
      setUser("Customer");
      setEmployeeCss("none");
      setCustomerCss("2px solid #4cceac");
    }
  } 
  return (
    <Box sx={{height: "100vh",overflow: "auto"}}>
      <Topbar title="Send Message" message="Connect With your users!" />
      <Box ml="1rem" display="flex" fontSize="20px" gap="1rem" 
          mb="2rem" onClick={handleUserChange}>
        <Box borderBottom={customerCss} padding="8px"

          sx={{
            cursor: "pointer",
          }}>
          Customer
        </Box>
        <Box padding="8px" borderBottom={employeeCss}
        sx={{
          cursor: "pointer",
        }}  >
          Employee
        </Box>
      </Box>
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
                  label="id"
                  autoComplete='off'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.id}
                  name="id"
                  error={!!touched.id && !!errors.id}
                  helperText={touched.id && errors.id}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  autoComplete='off'
                  multiline
                  label="Message"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.message}
                  name="message"
                  error={!!touched.message && !!errors.message}
                  helperText={touched.message && errors.message}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Send Message
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default SendMessages