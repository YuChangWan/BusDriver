const router = require('express').Router()
const sign = require('./sign');

router.use('/sign', sign);

router.all('*', (req, res) => {
    res.status(404).send({ success: false, msg: `unknown uri ${req.path}` });
});

module.exports = router;
