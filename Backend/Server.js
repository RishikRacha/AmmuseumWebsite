const express = require('express');
require('dotenv').config();
const app = express();
// const PORT = 6969;
const PORT = process.env.PORT || 6969;
const GameRoute = require('./router/games')
const createConnection = require('./config/connection');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/api/games", GameRoute);

console.log("PORT is", PORT);

app.post('/test', (req,res)=>{
    console.log("Test route HITTT");
    res.send({message: "test success"})
})

app.get("/", (req,res)=>{
    res.send({message: "Backend is up and responding"})

})


app.listen(PORT, ()=>{
    console.log("server started on "+ PORT);
    createConnection();
})
