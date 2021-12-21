// connecting mongoDB to our entry point (or to our project)

const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/keynote?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

// function to connect to mongoDB
const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Mongoose connected succesfully!");
    })
}

module.exports = connectToMongo;
