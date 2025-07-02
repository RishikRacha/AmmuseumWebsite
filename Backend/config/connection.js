const mongoose = require('mongoose');

function createConnection() {
    mongoose
          .connect("mongodb://127.0.0.1:27017/ammuseumdb")
          .then(()=>console.log("Connected to Database 'ammuseumdb'"))
          .catch(()=>console.log("Could not connect to Database"));
}

module.exports = createConnection;