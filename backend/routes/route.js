const express = require("express");
const adminLogin = require("../controller/adminLogin");
const createFAQ = require("../controller/createFAQ");
const getFAQ = require("../controller/getFAQ");
const updateFAQ = require("../controller/updateFAQ");
const deleteFAQ = require("../controller/deleteFAQ");

const router = express.Router();

router.post("/admin-login",adminLogin);


router.post("/faq",createFAQ);
router.get("/faq",getFAQ);
router.put("/faq/:id",updateFAQ)
router.delete("/faq/:id",deleteFAQ)

module.exports = router;