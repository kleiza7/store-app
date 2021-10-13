const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect("",
    {
        useNewUrlParser:true
    }, () =>{
        console.log("connect the database")
    });

};


module.exports = connectDatabase;