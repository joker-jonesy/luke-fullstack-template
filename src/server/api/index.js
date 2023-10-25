const express = require('express');
const router = express.Router();

router.use("/posts", require("./post"))
router.use("/tags", require("./tag"))
router.use("/likes", require("./likes"))
router.use("/comments", require("./comment"))
router.use("/search", require("./search"))
router.use("/votes", require("./vote"))

module.exports = router;