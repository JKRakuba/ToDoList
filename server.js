// Imported the express module
const express = require('express');

// Initialized the Express app
const app = express();

// Middleware to parse JSON data in the body
app.use(express.json());

// Default route: Home page
app.get('/', (req, res) => {
    res.send('Welcome to the default server!');
});

// API route: Get data from the server
app.get('/api/data', (req, res) => {
    res.json({
        message: 'This is some data from the server.',
        data: [1, 2, 3, 4, 5]
    });
});

// Port set to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
