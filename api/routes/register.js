const express = require('express');
const router = express.Router();
const multer = require('multer')
const bcrypt = require('bcrypt');
const User = require('../models/user.database');


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

router.post('/', upload.single('image'), async (req, res) => {

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

            if (doc) {
                console.log("New user has been registered successfully");
                res.status(201).json({ success: true, message: 'New user has been created' });
            } else {
                res.status(201).json({ success: true, message: 'Unable to create new User' });
            }

        }
    } catch (error) {
        console.log("An error occurred", error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
})

module.exports = router;