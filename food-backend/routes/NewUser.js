const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwtSecret = "HelloMyNameIsChhodoKyakarogejaanKe";

router.post(
  "/createuser",
  [
    body("email", "Incorrect Email").isEmail(),
    body("password", "Password must contain minimum 6 character").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log("Error : ", error);
      res.json({ success: false, Error: error });
    }
  }
);

router.post(
  "/userlogin",
  [
    body("email", "Incorrect Email").isEmail(),
    body("password", "Password must contain minimum 6 character").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let userdata = await User.findOne({ email: req.body.email });

      if (!userdata) {
        return res.status(400).json({ errors: "Please Enter Correct Email.." });
      }

      const pwd = await bcrypt.compare(req.body.password, userdata.password);
      if (!pwd) {
        return res
          .status(400)
          .json({ errors: "Please Enter Correct Password.." });
      }

      const data = {
        user: { id: userdata.id },
      };

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log("Error : ", error);
      res.json({ success: false, Error: errors });
    }
  }
);

module.exports = router;
