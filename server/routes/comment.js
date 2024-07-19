const express = require("express");
const router = express.Router();
const Comment = require("../models/commentModel");
const Product = require("../models/productModel");

router.post("/", async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();

    await Product.findByIdAndUpdate(comment.productId, {
      $push: { comments: comment._id },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ message: "Error creating comment" });
  }
});

router.get("/:productId", async (req, res) => {
  try {
    const comments = await Comment.find({ productId: req.params.productId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedComment);
  } catch (error) {
    res.status(400).json({ message: "Error updating comment" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment" });
  }
});

module.exports = router;
