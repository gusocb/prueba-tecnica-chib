const express    = require('express');
const router     = express.Router();
const User       = require('../models/User');

  //update User
  router.put('/workers/profile/edit',(req, res) => {
    User.findByIdAndUpdate(req.user.id,{...req.body})
    .then(res.json('User Updated'))
    .catch(err => console.log(err))
  });

module.exports = router;
