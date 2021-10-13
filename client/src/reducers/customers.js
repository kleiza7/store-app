import { FETCH_ALL_CUSTOMERS, FETCH_ADDED_CUSTOMER, FETCH_PAID_CUSTOMER } from "../constants/actionTypes";


export default(customers=[], action) => {
    switch (action.type) {
        case FETCH_ALL_CUSTOMERS:
            
            return action.payload;
        
        case FETCH_ADDED_CUSTOMER:

            return customers.map((customer) => customer._id === action.payload._id ? action.payload : customer);

        case FETCH_PAID_CUSTOMER:

            return customers.map((customer) => customer._id === action.payload._id ? action.payload : customer);

        default:
            
            return customers;
    }
}