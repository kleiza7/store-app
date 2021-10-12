import { FETCH_ALL_CUSTOMERS} from "../constants/actionTypes";
import * as api from "../api/index";


export const getAllCustomers = () => async(dispatch) => {
    try{
        // const {data} = await api.fetchAllCustomers();
        // console.log(data)

        const data = JSON.parse(localStorage.getItem("customers"))
        
        dispatch({type:FETCH_ALL_CUSTOMERS, payload:data});
    }
    catch(error){
        console.log(error);
    }
}



export const addCustomer = (formData) => async(dispatch) => {
    try{
        // const {data} = await api.fetchAllCustomers();
        // console.log(data)

        let customers;
        let isThere = false;
        if(localStorage.getItem("customers") === null){
            customers = []
            customers[0] = formData;
        }else{
            customers = JSON.parse(localStorage.getItem("customers"))
            customers.forEach(customer => {
                if(customer.name === formData.name) isThere=true;
            })
            if(isThere){
                let installmentArr =[]; 
                for(let i =0;i<formData.receivedProducts[0].installment;i++){
                    installmentArr.push(false);
                }
                    let product = {
                        name:formData.receivedProducts[0].name,
                        brand:formData.receivedProducts[0].brand,
                        model:formData.receivedProducts[0].model,
                        price:formData.receivedProducts[0].price,
                        installment:formData.receivedProducts[0].installment,
                        payment:formData.receivedProducts[0].payment,
                        remainingDebt:formData.receivedProducts[0].remainingDebt,
                        firstInstallment : formData.receivedProducts[0].firstInstallment,
                        remainingInstallment : installmentArr
                    }
                    console.log(product)
                    customers.forEach(customer => {
                        if(customer.name === formData.name)
                        customer.receivedProducts.push(product)})
                        isThere = false;
                }else{
                    customers.push(formData);
                }
            }
                     
        
        localStorage.setItem("customers", JSON.stringify(customers));
        dispatch({type:FETCH_ALL_CUSTOMERS, payload:customers});
    }
    catch(error){
        console.log(error);
    }
}

export const payInstallment = (isPaidInstallment, price, customerName, productName, firstInstallment) => async(dispatch) => {
    try{
    let customers = JSON.parse(localStorage.getItem("customers"));
    if(customers.length !== 0){
        customers.forEach(customer => {
            if(customer.name === customerName){
                customer.receivedProducts.forEach(product => {
                    if(product.name === productName && product.firstInstallment === firstInstallment){
                        if(!isPaidInstallment){
                            if(product.remainingDebt - price < 0){
                                product.remainingDebt = 0;
                            }else{
                            product.remainingDebt -= price;
                            }

                            for(let i =0;i<product.remainingInstallment.length;i++){
                                if(product.remainingInstallment[i] === false)
                                {
                                    product.remainingInstallment[i] = true;
                                    break;
                                }
                            }
                        }
                        
                    }
                })
            }
        })
    }

    localStorage.setItem("customers", JSON.stringify(customers));
    dispatch({type:FETCH_ALL_CUSTOMERS, payload:customers});
    }catch(error){
        console.log(error)
    }
}