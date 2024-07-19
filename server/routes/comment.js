const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Comment = require("../models/commentModel");
const Product = require("../models/productModel");

router.get("/", async (req, res) => {
  const products = await Product.find().populate("comments");

  const allComments = products.flatMap((product) => product.comments);

  res.json(allComments);
});

router.post("/", async (req, res) => {
  try {
    const { productId, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const comment = new Comment({ productId, description });
    await comment.save();

    await Product.findByIdAndUpdate(productId, {
      $push: { comments: comment._id },
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(400).json({ message: "Error creating comment" });
  }
});

// Update a comment
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid comment ID format" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(400).json({ message: "Error updating comment" });
  }
});

// Delete a comment
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid comment ID format" });
    }

    const result = await Comment.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove comment from the product
    await Product.findByIdAndUpdate(result.productId, {
      $pull: { comments: id },
    });

    res.json({ message: "Comment deleted" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment" });
  }
});

module.exports = router;
