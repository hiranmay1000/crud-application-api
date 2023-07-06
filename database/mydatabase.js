const mongoose = require('mongoose');


mongoose.connect("mongodb+srv://hiranmay1000:zDQQER5660fINaO2@test-rest-api.6oktbdt.mongodb.net/myTestDb");

mongoose.connection.on('error', (err) => {
    console.log("An error occured while connecting to the database due to", err);
})

mongoose.connection.on('connected', connected => {
    console.log("Database connected successfully");
})


module.exports = mongoose;