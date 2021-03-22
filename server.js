const express = require("express");
const { check } = require("express-validator");
const app = express();
app.use(express.json());
const port = 8000;

//  Import controllers
const {
  getAllNotes,
  getSingleNote,
  addNote,
  updateNote,
  deleteNote,
} = require("./controller/controller");

// import database connector
const { connectDB } = require("./databaseConnector/databaseConnector");

// connecting to the database
connectDB();

// root route
app.get("/", (req, res) => {
  res.send("This is the home page!");
});

// get all notes
app.get("/notes", getAllNotes);

// get single note
app.get("/notes/:id", getSingleNote, check("id", "ID is invalid").isMongoId());

// add note
app.post(
  "/notes",
  [
    check("title", "Title is required")
      .notEmpty()
      .isLength({ min: 3, max: 10 })
      .withMessage("Title must be in between 3 to 10 characters"),
    check("description")
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ min: 10, max: 100 })
      .withMessage("Title must be in between 10 to 100 characters"),
  ],
  addNote
);

// update note
app.put(
  "/notes/:id",
  [
    check("id", "ID is Invalid").isMongoId(),
    check("title", "Title is required").optional().notEmpty(),
    check("description", "Description is required").optional().notEmpty(),
  ],
  updateNote
);

// delete note
app.delete("/notes/:id", check("id", "Id is invalid").isMongoId(), deleteNote);

// server
app.listen(port, () => {
  console.log("server is running!");
});
