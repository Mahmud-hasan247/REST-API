const express = require("express");
const app = express();
app.use(express.json());
const port = 8000;

// import database connector
const { connectDB } = require("./databaseConnector/databaseConnector");

// connecting the database
connectDB();

//  routes
const noteRoutes = require("./routes/noteRoutes");
const indexRoutes = require("./routes/index");

app.use("/notes", noteRoutes);
app.use("/", indexRoutes);

// server
app.listen(port, () => {
  console.log("server is running!");
});
