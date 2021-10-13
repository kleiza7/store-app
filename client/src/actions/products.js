import { FETCH_ALL_PRODUCTS } from "../constants/actionTypes";

import * as api from "../api/index";



export const getAllProducts = () => async(dispatch) => {
    try{
        const {data} = await api.fetchAllProducts();

        dispatch({type:FETCH_ALL_PRODUCTS, payload:data});
        
    }
    catch(error){
        console.log(error);
    }
}

