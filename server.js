const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sinikukiss",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

app.get("/admin", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "admin.html"))
);

app.post("/api/pesan", (req, res) => {
  const { nama, nohp, tanggal, alamat, jeniscookies, qty } = req.body;
  const sql = `INSERT INTO orders (nama, nohp, tanggal, alamat, jeniscookies, qty) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [nama, nohp, tanggal, alamat, jeniscookies, qty],
    (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      return res
        .status(200)
        .json({ message: "Terima kasih sudah membeli!", success: true });
    }
  );
});

app.listen(port, () => console.log(`Server running on port ${port}`));
