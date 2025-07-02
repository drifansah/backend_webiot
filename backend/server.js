// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let taman1State = "OFF"; // nilai default

// GET status
app.get('/api/taman1', (req, res) => {
    res.json({ status: taman1State });
});

// SET status
app.post('/api/taman1', (req, res) => {
    const { status } = req.body;
    if (status === "ON" || status === "OFF") {
        taman1State = status;
        res.json({ success: true, status: taman1State });
    } else {
        res.status(400).json({ success: false, message: "Invalid status" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
