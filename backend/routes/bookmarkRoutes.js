const express = require("express");
const verifySupabase = require("../middleware/verifySupabase");
const Bookmark = require("../models/Bookmark");

const router = express.Router();

// Create bookmark
router.post("/add", verifySupabase, async (req, res) => {
  try {
    const { title, url, category } = req.body;

    const newBookmark = new Bookmark({
      title,
      url,
      category,
      user: req.user.sub, // Supabase user ID
    });

    await newBookmark.save();
    res.status(201).json(newBookmark);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get bookmarks
router.get("/", verifySupabase, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({
      user: req.user.sub,
    }).sort({ createdAt: -1 });

    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update bookmark
router.put("/update/:id", verifySupabase, async (req, res) => {
  try {
    const { title, url, category } = req.body;

    const bookmark = await Bookmark.findById(req.params.id);
    if (!bookmark) return res.status(404).json({ message: "Bookmark not found" });

    if (bookmark.user !== req.user.sub) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    bookmark.title = title;
    bookmark.url = url;
    bookmark.category = category;

    await bookmark.save();
    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete bookmark
router.delete("/delete/:id", verifySupabase, async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) return res.status(404).json({ message: "Bookmark not found" });

    if (bookmark.user !== req.user.sub) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await bookmark.deleteOne();
    res.json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Toggle favourite
router.put("/favourite/:id", verifySupabase, async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) return res.status(404).json({ message: "Bookmark not found" });

    if (bookmark.user !== req.user.sub) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    bookmark.favourite = !bookmark.favourite;
    await bookmark.save();

    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
