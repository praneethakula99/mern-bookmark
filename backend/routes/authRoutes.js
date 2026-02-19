const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// User Registration

router.post("/signup",async(req,res)=>{
    try{
        const {username,email,password} = req.body;

        //check if user already exists
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message: "User already exists"});

        user = new User({username,email,password});
        await user.save();

        res.status(201).json({message:"User registered successfully"});
    }
    catch(error)
    {
        res.status(500).json({message:"Server Error"});
    }
});

// User Login

router.post("/login",async(req,res)=>{
    try {
        const { email, password } = req.body;
    
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });
    
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    
        // Generate JWT Token
        const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
    
        res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
      } catch (error) {
        res.status(500).json({ message: "Server error" });
      }
});

module.exports = router;
