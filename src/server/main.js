const express = require("express");
const ViteExpress = require("vite-express");
const path = require("path");
const cors = require("cors");
const {Server} = require("http");



const app = express();

app.use(cors());

app.use("/", express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));
app.use("/auth", require("./auth"))

// backend routes
ViteExpress.listen(app, process.env.PORT||3000, () =>
  console.log("Server is listening on port 3000...")
);

const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
});

io.listen(4000);


