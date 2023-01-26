const router = require('express').Router()
const { models: { Freelancer, Project }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const freelancers = await Freelancer.findAll({include: Project })
    res.json(freelancers)
  } catch (err) {
    next(err)
  }
})

router.get('/:freelancerId', async (req, res, next) => {
  try {
    const freelancer = await Freelancer.findByPk(req.params.freelancerId)
    res.json(freelancer)
  } catch (err) {
    next(err)
  }
})

router.delete("/:freelancerId", async (req, res, next) => {
  try {
    const freelancer = await Freelancer.findByPk(req.params.freelancerId);
    res.send( await freelancer.destroy());
  } catch (error) {
    console.log("Error in delete user route");
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try{
    const freelancer = await Freelancer.findByPk(req.params.id)
    res.send(await freelancer.update(req.body))
  }catch(err){
    next(err)
  }
})
