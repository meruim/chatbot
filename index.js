const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

const { closestConditionFunction } = require("./function.js");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client")));

app.post("/chat", (req, res) => {
  const message = req.body.message.toLowerCase();
  let response = "Sorry, I didn't understand that.";

  const closestQuestion = closestConditionFunction(message);

  response = closestQuestion;

  res.json({ message: response });
});

// una
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
