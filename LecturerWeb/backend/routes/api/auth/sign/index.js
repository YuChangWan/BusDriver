const router = require('express').Router();
const ctrl = require('./ctrls');

router.post('/', ctrl.in);
router.post('/check', ctrl.check)

router.all('*', (req, res) => {
    res.status(404).send({ success: false, msg: `unknown uri ${req.path}` });
});

module.exports = router;
