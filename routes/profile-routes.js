const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');

  //get user

router.get('/profile', (req, res) => {
  User.findById(req.user.id)
  .then(user => res.json(user))
  .catch(err => console.log(err))
})

  //update User
  router.put('/profile/edit',(req, res) => {
    User.findByIdAndUpdate(req.user.id,{...req.body})
    .then(user => res.json(user))
    .catch(err => console.log(err))
  });

module.exports = router;
