const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    category: { type: String, required: true },
    favourite: { type: Boolean, default: false },

    // 🔥 IMPORTANT FIX
    user: { type: String, required: true },  // NOT ObjectId
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmark", BookmarkSchema);
