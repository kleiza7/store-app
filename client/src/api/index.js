import axios from "axios";


export const fetchAllCustomers = () => axios.get("http://localhost:5000/api/customers/getAllCustomers")

export const addCustomer = (formData) => axios.post("http://localhost:5000/api/customers/addCustomer", formData)

export const payInstallment = (formData) => axios.post("http://localhost:5000/api/customers/payInstallment", formData)

export const deleteProductFromCustomer = (customerId, productId) => axios.delete(`http://localhost:5000/api/customers/${customerId}/product/${productId}`)

export const fetchAllProducts = () => axios.get("http://localhost:5000/api/products/getAllProducts")

