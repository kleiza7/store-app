const Customer = require('../models/Customer');
const mongoose = require('mongoose');
const asyncErrorWrapper = require("express-async-handler")

const getAllCustomers = asyncErrorWrapper(async(req, res, next) => {
    const customers = await Customer.find();
    
    res
    .status(200)
    .json(customers);
});

const addCustomer = asyncErrorWrapper(async(req, res, next) => {
    const newCustomer = req.body;
    const customers = await Customer.find({name:newCustomer.name})
    let oldCustomer = customers[0];
    if(oldCustomer){
        oldCustomer.address = newCustomer.address;
        newCustomer.receivedProducts.forEach(index => oldCustomer.receivedProducts.push(index));

        let customer = await oldCustomer.save(); //böyle yazınca promise pending olarak bekliyor
        
        res.status(200).json(customer)
        
    }else{
        const customers = await Customer.create(newCustomer);
        res
        .status(200)
        .json(customers);
    }
    
});

const payInstallment = asyncErrorWrapper(async(req, res, next) => {
    const {price, customerName, productName} = req.body;
    
    const customers = await Customer.find({name:customerName})
    let customer = customers[0]
    
    if(customer){
        customer.receivedProducts.forEach(product => {
            if(product.name === productName){
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
        })

        let newCustomer = await customer.save();
        res.status(200).json(newCustomer)
    }else{
        res.status(400).json("No customer found with this name.");
    }
    
    
    
});

module.exports = {
    getAllCustomers,
    addCustomer,
    payInstallment
}