const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cityRoutes = require("./routes/cityRoutes");

dotenv.config();
connectDB();
const app = express();

//middleware
app.use(cors());
app.use(express.json()); // to accept JSON data

app.get("/", (req, res) => {
  res.send("Hello");
});

// **** USER-ROUTES ****
app.use("/api/user", userRoutes);

//**CITIES-ROUTE */
app.use("/api", cityRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`Server started on port ${PORT}`.yellow.bold));
