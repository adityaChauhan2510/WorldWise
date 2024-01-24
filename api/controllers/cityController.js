const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const mongoose = require("mongoose");

const fetchCities = asyncHandler(async (req, res) => {
  try {
    const userCities = req.user.cities;

    res.status(200).json(userCities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

const getCity = asyncHandler(async (req, res) => {
  try {
    const city = req.user.cities.find((city) => city.id === req.params.id);
    //console.log(city);

    res.status(200).json(city);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

const createCity = asyncHandler(async (req, res) => {
  try {
    const newCity = {
      _id: new mongoose.Types.ObjectId(), // Generate a new unique ObjectId for the city
      ...req.body,
    };

    //console.log(newCity);
    req.user.cities.push(newCity);

    await req.user.save();
    res.status(201).json(newCity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Internal Server Error" });
  }
});

const deleteCity = asyncHandler(async (req, res) => {
  try {
    const cityIdToDelete = req.params.id;

    const updatedCityList = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { cities: { _id: cityIdToDelete } } },
      { new: true }
    );

    //console.log(updatedCityList.cities);
    res.status(200).json(updatedCityList.cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { fetchCities, getCity, createCity, deleteCity };
