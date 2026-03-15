const express = require('express');
const path = require('path'); // Import path to help with file paths
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Game state
let timeLeft = 30; // Example game time in seconds
let score = 0;
let gameInterval;

// Endpoint to start the game
app.post('/start-game', (req, res) => {
  timeLeft = 30;
  score = 0;

  // Start the countdown
  gameInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
    } else {
      clearInterval(gameInterval);
    }
  }, 1000);

  res.json({ timeLeft, score });
});

// Endpoint to get the game state
app.get('/game-state', (req, res) => {
  res.json({ timeLeft, score });
});

// Serve the HTML file at the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust path to your HTML file
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
