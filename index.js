// Dependencies are imported
// express, body-parser, and path. These dependencies are required to run an Express.js server and handle HTTP requests.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

// Import the functions
// closestConditionFunction is imported from function.js to process the incoming message and generate a response
const { closestConditionFunction } = require("./function.js");

// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, "client")));

// Define a POST endpoint at /chat
// This endpoint processes chat messages and returns a response
app.post("/chat", (req, res) => {
  // Get the message from the request body and convert it to lowercase
  const message = req.body.message.toLowerCase();
  // Set a default response message
  let response = "Sorry, I didn't understand that.";

  // Use closestConditionFunction to find the closest matching question/condition
  const closestQuestion = closestConditionFunction(message);

  // Set the response to the result of closestConditionFunction
  response = closestQuestion;

  // Send the response back as a JSON object
  res.json({ message: response });
});

// Define a GET endpoint at /
// This endpoint serves the index.html file from the 'client' directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// Set the port for the server to listen on, using the PORT environment variable or defaulting to 3000
const PORT = process.env.PORT || 3000;
// Start the server and log the URL
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
