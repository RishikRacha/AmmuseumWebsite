const mongoose = require('mongoose');
require('dotenv').config();

function createConnection() {
    mongoose
        //   .connect("mongodb://127.0.0.1:27017/ammuseumdb")
          .connect(process.env.MONGODB_URI)
          .then(()=>console.log("Connected to Database 'ammuseumdb'"))
          .catch(()=>console.log("Could not connect to Database"));
}

module.exports = createConnection;