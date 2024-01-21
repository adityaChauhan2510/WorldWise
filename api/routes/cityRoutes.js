const express = require("express");
const { fetchCities, getCity } = require("../controllers/cityController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/cities", protect, fetchCities);
router.get("/cities/:id", protect, getCity);

module.exports = router;
