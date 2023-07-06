const express = require('express');
const router = express();
const User = require('../models/user.database');


router.get('/', async (req, res) => {
    const docs = await User.find({});
    res.json(docs);
});


module.exports = router;