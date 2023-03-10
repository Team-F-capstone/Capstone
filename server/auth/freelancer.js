const router = require('express').Router();
const {
  models: { Freelancer },
} = require('../db');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await Freelancer.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await Freelancer.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/freelancerMe', async (req, res, next) => {
  try {
    res.send(await Freelancer.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
