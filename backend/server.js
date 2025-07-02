const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let taman1State = "OFF";

app.get('/api/taman1', (req, res) => {
  res.json({ status: taman1State });
});

app.post('/api/taman1', (req, res) => {
  const { status } = req.body;
  if (status === "ON" || status === "OFF") {
    taman1State = status;
    res.json({ success: true, status: taman1State });
  } else {
    res.status(400).json({ success: false, message: "Invalid status" });
  }
});

app.get('/', (req, res) => {
  res.send('ESP Backend API Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
