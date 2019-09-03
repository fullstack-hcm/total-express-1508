const express = require('express');
const router  = express.Router();

router.get('/chi-tiet-nguoi-dung', (req, res) => {
    res.json({ message: `HELLO USER` });
});

router.get('/:username', (req, res) => {
    const { username } = req.params;
    res.json({ message: `HELLO USER = ${username}` });
});

exports.USER_ROUTE = router;