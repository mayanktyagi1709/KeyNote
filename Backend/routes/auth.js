const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");    // express validator to validate the user (at the time of register)
const bcrypt = require('bcryptjs');                                 // bcryptjs for hashing passwords
const jwt = require('jsonwebtoken');                                // jwt-jasonwebtoken for authorization (when the user login again)

const JWT_SECRET = 'ThisIsMayank'
// Create a user using POST: "/api/auth/createuser"- No login required.
router.post("/createuser",[
  // Inserted checks. If these are not fulfilled by the user, error will be thrown.
    // name must be at least 5 chars long
    body("name", "Enter your name").isLength({ min: 3 }),
    // username must be an email
    body("email", "e.g., johndoe@gmail.com").isEmail(),
    // password must be at least 5 chars long
    body("name", "Password must be of atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions.
    // If there are errors, return Bad request and errors.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check whether the email already exists
      let user = await User.findOne({email: req.body.email})
      if(user)
      {
        return res.status(400).json({ errors: "Sorry a user with this email already exists" });
      }
      // create a new user
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash('req.body.password', salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      })

      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);
      // whatever will be in the body will be given as a response
        //res.json(req.body)
        res.json({authtoken})

    }
    catch(error)
    {
      console.error(error.message);
      res.status(400).send('Some Error Occurred' );
    }
  }
);

module.exports = router;
