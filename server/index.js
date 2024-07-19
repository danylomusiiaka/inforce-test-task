const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/product");
const commentRoutes = require("./routes/comment");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)

app.use("/products", productRoutes);
app.use("/comments", commentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

