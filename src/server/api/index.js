const express = require('express');
const router = express.Router();

router.use("/posts", require("./post"))
router.use("/tags", require("./tag"))

module.exports = router;