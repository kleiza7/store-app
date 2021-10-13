const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.connect("mongodb+srv://serafet:hellbreaker1@cluster0.6u9l1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser:true
    }, () =>{
        console.log("connect the database")
    });

};


module.exports = connectDatabase;