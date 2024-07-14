var express = require("express");
var router = express.Router();
const { add_comment ,show_add } = require("../controller/comment_controller");

router.post("/insert", add_comment);
router.get("/show", show_add);

module.exports = router;
