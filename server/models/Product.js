const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelPriceSchema = new Schema({
    model:{type:String},
    price:{type:Number}
})

const BrandSchema = new Schema({
    brand:{type:String},
    modelsPrices:[ModelPriceSchema]
},{usePushEach:true}
);

const ProductSchema = new Schema({
    name:{
    type:String
    },
    brands:[BrandSchema]
},{usePushEach:true})


module.exports = mongoose.model('Product', ProductSchema);