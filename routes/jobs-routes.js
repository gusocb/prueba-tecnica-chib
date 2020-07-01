const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');

  //all jobs
  router.get('/jobs',(req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err))
  });

  //job detail
  router.get('/jobs/:id',(req,res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => console.log(err))
  });


module.exports = router;
