const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");

const fetchCities = asyncHandler(async (req, res) => {
  try {
    const userCities = req.user.cities;
    //console.log(userCities);

    res.status(200).json(userCities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

const getCity = asyncHandler(async (req, res) => {
  try {
    const city = req.user.cities.find((city) => city.id === req.params.id);
    console.log(city);

    res.status(200).json(city);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

module.exports = { fetchCities, getCity };
