const express = require("express");
const verifySupabase = require("../middleware/verifySupabase");
const User = require("../models/User");

const router = express.Router();

router.post("/supabase-login", verifySupabase, async (req, res) => {
  const { email, name } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, name });
  }

  res.json({ message: "Login successful", user });
});

module.exports = router;
