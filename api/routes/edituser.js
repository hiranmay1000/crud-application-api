const express = require('express');
const router = express();
const User = require('../models/user.database');


router.post('/', async (req, res) => {
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


module.exports = router;