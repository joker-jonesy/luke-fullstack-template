const express = require("express");
const ViteExpress = require("vite-express");
const path = require("path");
const cors = require("cors");
const socket = require("socket.io");



const app = express();

app.use(cors());



app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));
app.use("/auth", require("./auth"))

// backend routes
const server = ViteExpress.listen(app, process.env.PORT||3000, () =>
  console.log("Server is listening on port 3000...")
);

const io = socket(server, {
    allowEIO3: true,
    cors: {credentials: true, origin: 'http://localhost:3000'},
});


