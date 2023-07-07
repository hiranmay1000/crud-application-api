const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');
const User = require('../models/model.user');

router.post('/', async (req, res) => {
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

module.exports = router;