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
//json 바디파싱 설정 추가
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors(corsOptions));

// api 라우터
app.use('/api', routers);


app.listen(port, ()=>{
    console.log(`start http://localhost:${54001}`); 
})

//노드에서 발생하는 예기치못한 에러처리 
process.on('uncaughtException', (err)=>{
    console.log('!!uncaughtException: ', err);
});
//프라미스에서 발생하는 예기치못한 에러처리 
process.on('unhandledRejection', (reason, promise) => {
console.error('!!!Unhandled Rejection at:', JSON.stringify(promise), 'reason:', JSON.stringify(reason))
});