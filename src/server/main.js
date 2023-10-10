const express = require("express");
const ViteExpress = require("vite-express");

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

app.get("/sauce", (req, res) => {
  res.send("This class is the sauce");
});

// backend routes

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
