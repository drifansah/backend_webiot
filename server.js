const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data.json");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

function readData() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return {
      taman1: { command: "OFF", status: "OFF" },
      taman2: { command: "OFF", status: "OFF" },
      taman3: { command: "OFF", status: "OFF" },
      taman4: { command: "OFF", status: "OFF" }
    };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.post("/api/:taman/command", (req, res) => {
  const { taman } = req.params;
  const { command } = req.body;
  const data = readData();

  if (data[taman] && (command === "ON" || command === "OFF" || command === "SLEEP" )) {
    data[taman].command = command;
    writeData(data);
    res.json({ success: true, command });
  } else {
    res.status(400).json({ error: "Taman tidak ditemukan atau command salah" });
  }
});


app.get("/api/:taman/command", (req, res) => {
  const { taman } = req.params;
  const data = readData();

  if (data[taman]) {
    res.json({ command: data[taman].command });
  } else {
    res.status(404).json({ error: "Taman tidak ditemukan" });
  }
});


app.post("/api/:taman/status", (req, res) => {
  const { taman } = req.params;
  const { status } = req.body;
  const data = readData();

  if (data[taman] && (status === "ON" || status === "OFF" || status === "SLEEP")) {
    data[taman].status = status;
    writeData(data);
    res.json({ success: true, status });
  } else {
    res.status(400).json({ error: "Taman tidak ditemukan atau command salah" });
  }
});


app.get("/api/:taman", (req, res) => {
  const { taman } = req.params;
  const data = readData();

  if (data[taman]) {
    res.json({ status: data[taman].status });
  } else {
    res.status(404).json({ error: "Taman tidak ditemukan" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend ready at http://localhost:${PORT}`);
});
