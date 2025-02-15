const express = require("express");
const mongoose = require("mongoose")
const app = express();
const router = require("./routes/index");
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/api/v1" , router);


app.listen(3000 , ()=>{
    console.log("Server is up")
})
