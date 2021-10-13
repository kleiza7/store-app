import { FETCH_ALL_CUSTOMERS, FETCH_ADDED_CUSTOMER, FETCH_PAID_CUSTOMER, DELETE_PRODUCT_FROM_CUSTOMER} from "../constants/actionTypes";
import * as api from "../api/index";


export const getAllCustomers = () => async(dispatch) => {
    try{
        const {data} = await api.fetchAllCustomers();

        
        dispatch({type:FETCH_ALL_CUSTOMERS, payload:data});
    }
    catch(error){
        console.log(error);
    }
}



export const addCustomer = (formData) => async(dispatch) => {
    try{
        const {data} = await api.addCustomer(formData);

        dispatch({type:FETCH_ADDED_CUSTOMER, payload:data});
    }
    catch(error){
        console.log(error);
    }
}

export const payInstallment = (isPaidInstallment, price, customerName, productName, firstInstallment) => async(dispatch) => {
    try{
        
    const resBody = {
        customerName,
        productName,
        price
    }
        const {data} = await api.payInstallment(resBody);
        
    dispatch({type:FETCH_PAID_CUSTOMER, payload:data});
    }catch(error){
        console.log(error)
    }
}

export const deleteProductFromCustomer = (customerId, productId) => async(dispatch) => {
    try{
        const {data} = await api.deleteProductFromCustomer(customerId, productId);
        console.log(data);
        dispatch({type:DELETE_PRODUCT_FROM_CUSTOMER});
    }catch(error){
        console.log(error)
    }
}