require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.SERVICE_PORT || 54001;
const routers = require('./routers');
const cors = require('cors');

//cors설정
const corsOptions = {
    origin: "http://localhost:54001",
    credentials: true
}
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOptions));

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