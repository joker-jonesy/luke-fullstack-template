const express = require('express');
const router = express.Router();

router.use("/posts", require("./post"))
router.use("/tags", require("./tag"))
router.use("/likes", require("./likes"))

module.exports = router;