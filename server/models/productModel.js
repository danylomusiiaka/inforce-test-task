const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  count: { type: Number, required: true },
  size: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  weight: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
