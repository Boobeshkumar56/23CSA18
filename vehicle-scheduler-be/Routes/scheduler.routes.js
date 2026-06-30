const express = require('express')
const router = express.Router()
const { schedule } = require("../Controllers/scheduler.controller.js")
router.get("/", (req, res) => {
    return res.send(schedule())

})
module.exports = router
