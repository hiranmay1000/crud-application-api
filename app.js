const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('./database/mydatabase');
const RegisterUser = require('./api/routes/register');
const UserDatabase = require('./api/routes/userdatabase');
const Login = require('./api/routes/login');
const AdminLogin = require('./api/routes/adminlogin');
const EditUser = require('./api/routes/edituser');
const DeleteUser = require('./api/routes/deleteuser');
const TestFile = require('./api/routes/testfile');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/register', RegisterUser);
app.use('/user-database', UserDatabase);
app.use('/login', Login);
app.use('/admin-login', AdminLogin);
app.use('/edit-user', EditUser);
app.use('/delete-user/:_id', DeleteUser);
app.use('/test', TestFile);


app.use((req, res, next) => {
    res.status(404).json({
        err: "Bad request - url not found",
    })
})

module.exports = app;