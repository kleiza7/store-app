const express = require('express');
const connectDatabase = require("./helpers/database/databaseConnectionHelper")
const routers = require("./routers/index");

const app = express();



connectDatabase();
app.use(express.json());

app.use("/api", routers);
app.listen(5000, () => {
    console.log("server started at 5000")
})
