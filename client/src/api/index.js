import axios from "axios";


export const fetchAllCustomers = () => axios.get("http://localhost:3000/customers")

export const fetchAllProducts = () => axios.get("http://localhost:3000/products")

