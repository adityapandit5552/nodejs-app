
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Advanced Color Studio server is running'
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Color Studio running on port ${PORT}`);
});
