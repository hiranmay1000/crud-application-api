const express = require('express');
const router = express();
const User = require('../models/model.user');


router.get('/', async (req, res) => {
    const docs = await User.find({});
    res.json(docs);
});


module.exports = router;