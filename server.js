const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user.database.js');
const multer = require('multer')
const bcrypt = require('bcrypt');



main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/dbdemo');
    console.log('Database connected!');

}


const server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.listen(8000, () => {
    console.log('Server is up and running on port: ', 8000);
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'image' + '-' + uniqueSuffix + '-' + file.originalname);
    }
})
const upload = multer({ storage });


server.post('/register', upload.single('image'), async (req, res) => {

    try {
        const { username } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("Username is already taken");
            return res.status(400).json({ message: "Username is already taken" });
        } else {
            let user = new User();

            user.name = req.body.name;
            user.username = req.body.username;
            const salt = await bcrypt.genSalt(5);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
            user.image = req.body.image;

            // Save the document in the mongodb collection
            const doc = await user.save();

            console.log("New user has been registered successfully");
            res.status(200).json({success: true, message: 'New user has been created'});
        }
    } catch (error) {
        console.log("An error occurred", error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
})

server.get('/user-database', async (req, res) => {
    const docs = await User.find({});
    res.json(docs);
});

// ...

server.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Retrieve the hashed password from the database based on the provided username
        const user = await User.findOne({ username });

        if (user) {
            // Compare the input password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                // Passwords match, proceed with login
                res.status(200).json({ success: true, message: "Login successful" });
            } else {
                // Passwords do not match
                res.status(401).json({ success: false, message: "Invalid credentials" });
            }
        } else {
            // User not found
            res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log("An error occurred", error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});



server.post('/admin-login', async (req, res) => {
    const { username, password } = req.body;

    if (username === "maxx" && password === "maxx") {
        res.send({ success: 'user-database' });
        return;
    } else {
        res.status(401).json({ message: 'invalid admin credentials' });
    }
})

server.post('/edit-user', async (req, res) => {
    try {
        const { userID, name, username } = req.body;

        console.log(req.body);
        const user = await User.findByIdAndUpdate(userID, { name, username }, { new: true });

        if (user) {
            console.log("User updated successfully:", user);
            res.status(200).json({ success: true, message: "User updated successfully" });
        } else {
            console.log("User not found");
            res.status(404).json({ success: false, message: "Invalid userId" });
        }
    } catch (error) {
        console.log("An error occurred", error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
});


server.delete('/delete-user/:_id', async (req, res) => {
    try {
        let _id = req.params._id;

        const result = await User.deleteOne({ _id });
        console.log(result);
        res.json({ message: 'User deleted successfully' });

    } catch (error) {
        console.log("An erro occured while deleting user");
        res.status(500).json({ message: 'Error deleting user' });

    }
});