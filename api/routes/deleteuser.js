const express = require('express');
const router = express();
const User = require('../models/user.database');


router.delete('/', async (req, res) => {
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


module.exports = router;