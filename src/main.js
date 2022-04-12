require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.servicePort;
const routers = require('./routers');

app.use('/api', routers);

// app.use('/', (req, res, next)=>{
//     console.log("middle 1")
//     // next()
    
// })

// app.use((req, res)=>{
//     console.log("middle 2")
//     res.send("hello express")
// })

app.listen(port, ()=>{
    console.log(port);
})