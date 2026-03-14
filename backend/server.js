const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://mongo:27017/watchlist", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const ItemSchema = new mongoose.Schema({
  title: String,
  type: String
});

const Item = mongoose.model("Item", ItemSchema);

// get all items
app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// add item
app.post("/items", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json(item);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});