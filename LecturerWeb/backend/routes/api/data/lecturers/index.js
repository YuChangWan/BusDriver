const router = require('express').Router();
const ctrl = require('./ctrls');

router.post('/', ctrl.info);
router.put('/', ctrl.mod);

router.all('*', (req, res) => {
    res.status(404).send({ success: false, msg: `unknown uri ${req.path}` });
});

module.exports = router;
