const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");    // express validator to validate the user (at the time of register)
const bcrypt = require('bcryptjs');                                 // bcryptjs for hashing passwords
const jwt = require('jsonwebtoken');                                // jwt-jasonwebtoken for authorization (when the user login again)
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'ThisIsMayank'

// ROUTE-1
// Create a user using POST: "/api/auth/createuser"- No login required.

router.post("/createuser",[
  // Inserted checks. If these are not fulfilled by the user, error will be thrown.
    // name must be at least 5 chars long
    body("name", "Enter your name").isLength({ min: 3 }),
    // email must be a valid email
    body("email", "e.g., johndoe@gmail.com").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password must be of atleast 5 characters").isLength({
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

      // creating an object data that needs to be passed to the jwt.sign
      const data = {
        user:{
          id: user.id
        }
      }
      // jwt authentication
      const authtoken = jwt.sign(data, JWT_SECRET);
      // whatever will be in the body will be given as a response
      //res.json(req.body)
      res.json({authtoken})

    }
    catch(error)
    {
      console.error(error.message);
      res.status(500).send('Internal Error Ocuured');
    }
  }
);

// ROUTE-2
// Authenticate a user using POST: "/api/auth/login"- No login required.

router.post("/login",[
    body("email", "Enter your email").isEmail(),
    body("name", "Enter your password").exists()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
      let user = await User.findOne(email);
      if(!user)
      {
        return res.status(400).json({error: 'Please enter correct credentials'});
      }
      // checking for the password of the same user that entered his email
      let comparePass = await bcrypt.compare(password, user.password);
      if(!comparePass)
      {
        return res.status(400).json({error: 'Please enter correct credentials'});
      }
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({authtoken})
    }
    catch(error)
    {
      console.error(error.message);
      res.status(500).send('Internal Error Ocuured');
    }
  })

// ROUTE-3
// Get loggedIn user details using POST: "/api/auth/getuser"- Login required.
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = re.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } 
  catch(error)
  {
    console.error(error.message);
    res.status(500).send('Internal Error Ocuured');
  }
})

module.exports = router;
