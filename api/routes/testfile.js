const express = require('express');
const router = express();


router.get('/', (req, res, next) => {
    res.status(200).json({
        msg: "test get req working fine",
    })
})


module.exports = router;