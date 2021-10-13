const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReceivedProductSchema = new Schema({
    name:{type:String},
    brand:{type:String},
    model:{type:String},
    price:{type:Number},
    installment:{type:Number},
    payment:{type:Number},
    remainingDebt : {type:Number},
    firstInstallment:{type:Date},//burada problem var, ilk taksit tarihini günümüz ayının 1 ay sonrası olarak atamalısın
    remainingInstallment:[Boolean]
})

const CustomerSchema = new Schema({
    name:{
        type:String
    },
    address:{
        type:String
    },
    receivedProducts:[ReceivedProductSchema]
});

module.exports = mongoose.model('Customer', CustomerSchema);
