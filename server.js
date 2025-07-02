const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const DATA_FILE = path.join(__dirname, "data.json");

// Fungsi baca status dari file
function readStatus() {
  try {
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    return {
      taman1: "OFF",
      taman2: "OFF",
      taman3: "OFF",
      taman4: "OFF"
    };
  }
}

// Fungsi simpan status ke file
function writeStatus(newStatus) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(newStatus, null, 2));
}

// GET status
app.get("/api/:taman", (req, res) => {
  const { taman } = req.params;
  const currentStatus = readStatus();

  if (currentStatus[taman] !== undefined) {
    res.json({ status: currentStatus[taman] });
  } else {
    res.status(404).json({ error: "Taman tidak ditemukan" });
  }
});

// POST update status
app.post("/api/:taman", (req, res) => {
  const { taman } = req.params;
  const { status: newStatus } = req.body;
  const currentStatus = readStatus();

  if (currentStatus[taman] !== undefined && (newStatus === "ON" || newStatus === "OFF")) {
    currentStatus[taman] = newStatus;
    writeStatus(currentStatus);
    res.json({ success: true, status: newStatus });
  } else {
    res.status(400).json({ error: "Data tidak valid" });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
