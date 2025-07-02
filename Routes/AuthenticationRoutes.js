const express = require("express");
const Userr = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const api = express.Router();

api.post("/register", async (req, res) => {
  let {userName,
       firstName,
       lastName,
       email,
       password,
       number,
       dob,
        } = req.body;

  try {
    const existingUser = await Userr.find({ email });

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;

    const user = new Userr({
      userName,
       firstName,
       lastName,
       email,
       password,
       number,
       dob,
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


api.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    const existinguser = await Userr.find({email });
        if(existinguser.length===0){
            res.json("user not found");
            return ;
        }
    let gotuser=existinguser[0];
        let pass=gotuser.password;


    const isPasswordValid = await bcrypt.compare(password, pass);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({id:existinguser[0]._id}, 'aman', { expiresIn: '1h' });
    res.cookie("token", token, {
          httpOnly: true,
          secure: true,                  // required for cross-site cookies over HTTPS
          sameSite: 'none'  // Enable secure flag in production
      });
        res.json({
          gotuser
        })

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports = api;
