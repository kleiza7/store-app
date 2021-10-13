const express = require("express");
const router = express.Router();
const { getAllCustomers, addCustomer, payInstallment} = require("../controllers/customers");

router.get("/getAllCustomers", getAllCustomers)
router.post("/addCustomer", addCustomer)
router.post("/payInstallment", payInstallment)

module.exports = router;