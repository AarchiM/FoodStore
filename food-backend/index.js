const express = require('express');
const mongoDB = require('./db');
require ('dotenv').config()
const port = process.env.PORT;
// const cors = require('cors');
const app = express();
mongoDB();

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5173");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json())
app.use('/api', require("./routes/NewUser"));
app.use('/api', require("./routes/FoodData"))
app.use('/api', require("./routes/OrderData"))

app.listen(port, ()=>{
    console.log(`Server is listening on ${port}`);
    
})