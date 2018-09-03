const router = require('express').Router();

const auth = require('./auth');
const data = require('./data');

router.use('/auth', auth);
router.use('/data', data);

router.all('*', (req, res) => {
  res.status(404).send({ success: false, msg: `unknown uri ${req.path}` });
});

module.exports = router;
