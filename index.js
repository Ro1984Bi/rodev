const express = require("express");
require("dotenv").config();
const portfolioRoute = require("./routes/portfolioRoute");
const mongodb = require("./db/mongodb");
const path = require("path");
const cors = require("cors");

mongodb();

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api/portfolio", portfolioRoute);

app.get("/download", (req, res) => {
  res.download("./cv.pdf");
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
