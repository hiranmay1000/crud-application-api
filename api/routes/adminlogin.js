const express = require('express');
const router = express();


router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (username === "maxx" && password === "maxx") {
        res.send({ success: 'user-database' });
        return;
    } else {
        res.status(401).json({ message: 'invalid admin credentials' });
    }
})

module.exports = router;