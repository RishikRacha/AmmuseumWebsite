const express = require('express');
// require('dotenv').config();
// if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
// }
const app = express();

const PORT = process.env.PORT || 6969;
const GameRoute = require('./router/games')
const AuthRoute = require('./router/auth')
const EventRoute = require('./router/events')
const RecommendationRoute = require('./router/recommendations')
const createConnection = require('./config/connection');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use("/api/games", GameRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/events", EventRoute);
app.use("/api/recommendations", RecommendationRoute);

console.log("PORT is", PORT);

app.get('/api/test', (req,res)=>{
    console.log("Test route HITTT");
    res.send({message: "test success"})
})

app.get("/api", (req,res)=>{
    res.send({message: "Backend is up and responding"})

})


app.listen(PORT, ()=>{
    console.log("server started on port: "+ PORT);
    createConnection();
})
