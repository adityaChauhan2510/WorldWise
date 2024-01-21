const express = require("express");
const { fetchCities, getCity, createCity, deleteCity } = require("../controllers/cityController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/cities", protect, fetchCities);
router.get("/cities/:id", protect, getCity);
router.post("/cities", protect, createCity);
router.delete("/cities/:id", protect, deleteCity);
module.exports = router;
