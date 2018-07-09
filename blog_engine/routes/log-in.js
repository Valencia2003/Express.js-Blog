const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
    res.send("<h1 style='text-align: center'>Log-in Here</h1>")
});
module.exports = router;