const express = require("express")
const sellingController = require("../controllers/selling")
const router = express.Router()
const {authAccessToken} = require("../middlewares/auth")

router
    .get("/list-detail", sellingController.listDetailSelling)
    .get("/list-selling", sellingController.listSelling)
    .get("/list-selling/:id", sellingController.listSellingById)
    .post("/insert", sellingController.insertSellingAndDetail)

module.exports = router