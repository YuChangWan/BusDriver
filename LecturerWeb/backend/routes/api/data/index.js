const router = require('express').Router();
const containers = require('./containers');
const lecturers = require('./lecturers');

router.use('/containers', containers);
router.use('/lecturers', lecturers);

router.all('*', (req, res) => {
    res.status(404).send({ success: false, msg: `unknown uri ${req.path}` });
});

module.exports = router;
