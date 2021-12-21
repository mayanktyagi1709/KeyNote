const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");

// Create a user using POST: "/api/auth". Doesn't require auth.
router.get(
  "/",
  [
    // name must be at least 5 chars long
    body("name", "Enter your name").isLength({ min: 3 }),
    // username must be an email
    body("email", "eg., johndoe@gmail.com").isEmail(),
    // password must be at least 5 chars long
    body("name", "Password must be of atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
      name: req.body.name,
      password: req.body.password,
      password: req.body.password,
    })
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        res.json({ error: "Please enter a unique email" });
      });
  }
);

module.exports = router;
