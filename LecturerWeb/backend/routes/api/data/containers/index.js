const router = require('express').Router();
const ctrl = require('./ctrls');

router.post('/list', ctrl.list);
router.post('/', ctrl.add);
router.post('/del', ctrl.del);

router.all('*', (req, res) => {
    res.status(404).send({ success: false, msg: `unknown uri ${req.path}` });
});

module.exports = router;
