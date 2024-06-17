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
  res.sendFile(path.join(__dirname, "public/admin", "admin.html"))
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

app.get("/api/orders", (req, res) => {
  const sql = "SELECT * FROM orders";
  db.query(sql, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    return res.status(200).json(result);
  });
});

app.get("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM orders WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    return res.status(200).json(result[0]);
  });
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { nama, nohp, tanggal, alamat, jeniscookies, qty } = req.body;
  const sql =
    "UPDATE orders set nama = ?, nohp = ?, tanggal = ?, alamat = ?, jeniscookies = ?, qty = ? WHERE id = ?";

  db.query(
    sql,
    [nama, nohp, tanggal, alamat, jeniscookies, qty, id],
    (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      return res
        .status(200)
        .json({ message: "Data berhasil diupdate!", success: true });
    }
  );
});

app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM orders WHERE id = ?";
  db.query(sql, id, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    return res
      .status(200)
      .json({ message: "Data berhasil dihapus!", success: true });
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
