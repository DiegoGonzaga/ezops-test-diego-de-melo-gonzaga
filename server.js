var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var mongoose = require("mongoose");
require("dotenv-safe").config();

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var Message = mongoose.model("Message", {
  name: String,
  message: String,
});
var dbUrl =
  "mongodb+srv://" +
  process.env.MONGO_USER +
  ":" +
  process.env.MONGO_PASS +
  "@" +
  process.env.MONGO_DOMAIN +
  "/" +
  process.env.MONGO_DB;
app.get("/messages", (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  });
});
app.post("/messages", (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) sendStatus(500);
    io.emit("message", message);
    res.sendStatus(200);
  });
});
app.delete("/messages", (req, res) => {
  var id = req.body.id;
  if (typeof id != "string") return res.sendStatus(400);
  Message.deleteOne({ _id: id }).exec((err) => {
    res.sendStatus(200);
  });
});
io.on("connection", () => {
  console.log("a user is connected");
});
mongoose.connect(dbUrl, (err) => {
  // console.log("mongodb connected", err);
});

module.exports = http;
