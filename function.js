const path = require("path");
const fs = require("fs");

// Construct the path to the data.json file located in the same directory
const dataPath = path.join(__dirname, "data.json");
// Import the conversations array from data.json
const { conversations } = require(dataPath);

function closestConditionFunction(user) {
  // Initialize the minimum distance to the largest safe integer value
  let minDistance = Number.MAX_SAFE_INTEGER;
  // Variable to hold the closest matching question
  let closest = "";

  // Split the user input into individual words
  const userWords = user.split(/\s+/);

  // Loop through each conversation (question-answer pair)
  for (const { question, answer } of conversations) {
    // Split the question into individual words
    const conditionWords = question.split(/\s+/);

    // Variable to accumulate the total distance for the current question
    let totalDistance = 0;
    // Loop through each word in the user input
    for (const userWord of userWords) {
      // Initialize the minimum word distance to the largest safe integer value
      let minWordDistance = Number.MAX_SAFE_INTEGER;
      // Loop through each word in the question
      for (const conditionWord of conditionWords) {
        // Calculate the Levenshtein distance between the user word and the question word
        const distance = getLevenshteinDistance(userWord, conditionWord);
        // Update the minimum word distance
        minWordDistance = Math.min(minWordDistance, distance);
      }
      // Add the minimum word distance to the total distance for the current question
      totalDistance += minWordDistance;
    }

    // Update the closest matching question if the current total distance is less than the minimum distance
    if (totalDistance < minDistance) {
      minDistance = totalDistance;
      closest = question;
    }
  }

  // Find the answer corresponding to the closest matching question
  const closestAnswer =
    conversations.find(({ question }) => question === closest)?.answer || "";
  return closestAnswer;
}

// Function to calculate the Levenshtein distance between two strings
function getLevenshteinDistance(a, b) {
  // Create a 2D array to store the distances
  const distance = Array.from(Array(a.length + 1), () =>
    Array(b.length + 1).fill(0)
  );

  // Initialize the first row and column of the array
  for (let i = 0; i <= a.length; i++) {
    distance[i][0] = i;
  }

  for (let j = 0; j <= b.length; j++) {
    distance[0][j] = j;
  }

  // Fill in the rest of the array
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      distance[i][j] = Math.min(
        distance[i - 1][j] + 1, // Deletion
        distance[i][j - 1] + 1, // Insertion
        distance[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1) // Substitution
      );
    }
  }

  // Return the Levenshtein distance between the two strings
  return distance[a.length][b.length];
}

// Export the functions for use in other files
module.exports = { closestConditionFunction, getLevenshteinDistance };
