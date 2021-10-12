import { FETCH_ALL_PRODUCTS } from "../constants/actionTypes";

import * as api from "../api/index";



export const getAllProducts = () => async(dispatch) => {
    try{
        // const {data} = await api.fetchAllProducts();
        let products = JSON.parse(localStorage.getItem("products"));
        
        dispatch({type:FETCH_ALL_PRODUCTS, payload:products});
        
    }
    catch(error){
        console.log(error);
    }
}

