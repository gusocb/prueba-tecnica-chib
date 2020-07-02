const express = require("express");
const router = express.Router();
const passport = require("passport");

//User model
const User = require("../models/User");

//for password encryption
const bcrypt = require("bcryptjs");

//signup route
router.post("/workers/signup", (req, res) => {
  const { name, lastName, phoneNumber, birthday, password } = req.body;

  //encrypt password
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new User({
    name,
    lastName,
    phoneNumber,
    birthday,
    password: hashPass,
  });

  newUser
    .save()
    .then((theUser) => {
      res.json(theUser);
    })
    .catch((error) => {
      res.json({ message: "something went wrong" });
    });
});

//login route
router.post("/workers/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      res.status(200).json(theUser);
    });
  })(req, res, next);
});

//logout route
router.post("/workers/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

router.get("/workers/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

module.exports = router;
