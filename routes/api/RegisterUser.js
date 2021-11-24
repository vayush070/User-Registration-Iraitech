const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post(
  "/",
  [
    check("firstname", "Name is required").not().isEmpty(),
    check("lastname", "Name is required").not().isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check("phone", "Phone number is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("password", "Please enter a password with min 6 characters").isLength(
      { min: 3 }
    ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, phone, address, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        // console.log("found error")
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }

      user = new User({
        firstname,
        lastname,
        email,
        phone,
        address,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );

      // res.send('user registered');
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
