const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  cityName: String,
  country: String,
  emoji: String,
  date: Date,
  notes: String,
  position: {
    lat: String,
    lng: String,
  },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default: "https://i.pravatar.cc/100?u=zz",
    },

    cities: [citySchema],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
