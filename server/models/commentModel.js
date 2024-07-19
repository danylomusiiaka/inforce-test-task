const mongoose = require("mongoose");

const date = new Date()

const commentSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  description: { type: String, required: true },
  date: { type: String, default: formatDate(date.now) },
});

function formatDate(date) {
  const timeFormatter = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const time = timeFormatter.format(date);
  const formattedDate = dateFormatter.format(date);

  return `${time} ${formattedDate}`;
}

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
