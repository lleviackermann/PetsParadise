import React, { useState } from 'react'
import Topbar from '../Components/Topbar';
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { baseURL } from "../../api/api"
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";

const checkoutSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    price: yup.number().required("Price is required!"),
    src: yup.string().required("Image link is required!"),
    productType: yup.string().required("ProductType is required!"),
    petType: yup.string().required("PetType is required!"),
    breed_group: yup.string(),
    index: yup.number()
});

const initialValues = {
    name: "",
    price: 0,
    src: "",
    productType: "",
    petType: "",
    breed_group: "None",
    index: 0
};

const AddProduct = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const verifyToken = useSelector((state) => state.auth.userToken);

    const handleFormSubmit = async (values, { resetForm }) => {
        const response = await fetch(
            `${baseURL}profile/admin/add-product`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": verifyToken,
                },
                body: JSON.stringify({
                    name: values.name,
                    price: values.price,
                    src: values.src,
                    productType: values.productType,
                    petType: values.petType,
                    breed_group: values.breed_group,
                    index: values.index
                })
            }
        );
        // if(response.status == 200) {
        //     toast.success("Product Added Successfully!");
        // } else {
        //     toast.error(response.data.error);
        // }
        resetForm();
    };

    const productType = ["food", "pet", "Accessory"];
    const petType = ["bird", "dog", "fish", "cat"];

    return (
        <Box sx={{ height: "100vh", overflow: "auto" }}>
            <Topbar title="Add Product" message="Increase your count of products " />
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
                                    type='number'
                                    autoComplete='off'
                                    label="price"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.price}
                                    name="price"
                                    error={!!touched.price && !!errors.price}
                                    helperText={touched.price && errors.price}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    autoComplete='off'
                                    label="src"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.src}
                                    name="src"
                                    error={!!touched.src && !!errors.src}
                                    helperText={touched.src && errors.src}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="number"
                                    autoComplete='off'
                                    label="index"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.index}
                                    name="index"
                                    error={!!touched.index && !!errors.index}
                                    helperText={touched.index && errors.index}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    autoComplete='off'
                                    label="breed_group"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.breed_group}
                                    name="breed_group"
                                    error={!!touched.breed_group && !!errors.breed_group}
                                    helperText={touched.breed_group && errors.breed_group}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <Box sx={{ gridColumn: "span 4" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="productType-label">ProductType</InputLabel>
                                        <Select
                                            fullWidth
                                            variant="filled"
                                            autoComplete='off'
                                            labelId="productType-label"
                                            label="productType"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.productType}
                                            name="productType"
                                            error={!!touched.productType && !!errors.productType}
                                            helperText={touched.productType && errors.productType}
                                            sx={{ gridColumn: "span 4" }}
                                        >
                                            {productType.map(product => (
                                                <MenuItem key={product} value={product} >{product}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ gridColumn: "span 4" }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="petType-label">PetType</InputLabel>
                                        <Select
                                            fullWidth
                                            variant="filled"
                                            autoComplete='off'
                                            labelId="petType-label"
                                            label="petType"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.petType}
                                            name="petType"
                                            error={!!touched.petType && !!errors.petType}
                                            helperText={touched.petType && errors.petType}
                                            sx={{ gridColumn: "span 4" }}
                                        >
                                            {petType.map(pet => (
                                                <MenuItem key={pet} value={pet} >{pet}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="secondary" variant="contained">
                                    Add Product
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
            {/* <ToastContainer position='bottom-right'/> */}
        </Box>
    )
}

export default AddProduct