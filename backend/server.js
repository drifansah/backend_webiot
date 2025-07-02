const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


// Simpan status lampu di memori (sifatnya sementara)
let status = {
  taman1: "OFF",
  taman2: "OFF",
  taman3: "OFF",
  taman4: "OFF"
};

// Endpoint GET status
app.get("/api/:taman", (req, res) => {
  const { taman } = req.params;
  if (status[taman] !== undefined) {
    res.json({ status: status[taman] });
  } else {
    res.status(404).json({ error: "Taman tidak ditemukan" });
  }
});

// Endpoint POST ubah status
app.post("/api/:taman", (req, res) => {
  const { taman } = req.params;
  const { status: newStatus } = req.body;

  if (status[taman] !== undefined && (newStatus === "ON" || newStatus === "OFF")) {
    status[taman] = newStatus;
    res.json({ success: true, status: newStatus });
  } else {
    res.status(400).json({ error: "Data tidak valid" });
  }
});

// Menyajikan file frontend dari folder public
app.use(express.static("public"));

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
