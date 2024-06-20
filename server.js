const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");
const session = require("express-session")
const crypto = require("crypto")

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const secretKey = crypto.randomBytes(64).toString("hex") // random secretkey

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))

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

function checkAuth(req,res,next) {
  if(req.session.loggedIn) next()
    else redirect("/login")
}

app.get("/admin", checkAuth, (req, res) =>
  res.sendFile(path.join(__dirname, "public/admin", "admin.html"))
);

app.get("/login", (req,res) => {
  res.sendFile(path.join(__dirname, "public/admin", "login.html"))
})

app.post("/api/login", (req,res) => {
  const {username, password} = req.body
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?"

  db.query(sql, [username, password], (err,result) => {
    if (err) return res.status(400).json({error: err.message})
    if(result.length > 0) {
      req.session.loggedIn = true;
      req.session.username = username;
      return res.status(200).json({message: "Berhasil login!", success: true});
    } else {
      return res.status(401).json({message: "Username atau Password salah", success: false})
    }
    
  })
})

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if(err) return res.status(400).json({error: err.message})
    res.redirect("/login")
  })
})

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
