const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, 'data.json');
const { conversations } = require(dataPath);

function closestConditionFunction(user) {
    let minDistance = Number.MAX_SAFE_INTEGER;
    let closest = "";

    const userWords = user.split(/\s+/);

    for (const { question, answer } of conversations) {
        const conditionWords = question.split(/\s+/);

        let totalDistance = 0;
        for (const userWord of userWords) {
            let minWordDistance = Number.MAX_SAFE_INTEGER;
            for (const conditionWord of conditionWords) {
                const distance = getLevenshteinDistance(userWord, conditionWord);
                minWordDistance = Math.min(minWordDistance, distance);
            }
            totalDistance += minWordDistance;
        }

        if (totalDistance < minDistance) {
            minDistance = totalDistance;
            closest = question;
        }
    }

    const closestAnswer = conversations.find(({ question }) => question === closest)?.answer || "";
    return closestAnswer;
}

function getLevenshteinDistance(a, b) {
    const distance = Array.from(Array(a.length + 1), () => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) {
        distance[i][0] = i;
    }

    for (let j = 0; j <= b.length; j++) {
        distance[0][j] = j;
    }

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            distance[i][j] = Math.min(
                distance[i - 1][j] + 1,
                distance[i][j - 1] + 1,
                distance[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
            );
        }
    }

    return distance[a.length][b.length];
}

module.exports = { closestConditionFunction, getLevenshteinDistance };