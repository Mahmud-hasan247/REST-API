const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 8000;

// import data model
const Note = require("./models/notes");

// connecting to the database
mongoose
  .connect("mongodb://localhost:27017/notes-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

//  static data for testing
// let notes = [
//   {
//     id: 1,
//     title: "note number 1",
//     description: "description no 1",
//   },
//   {
//     id: 2,
//     title: "note number 2",
//     description: "description no 2",
//   },
// ];

// root route
app.get("/", (req, res) => {
  res.send("This is the home page!");
});

// get all notes
app.get("/notes", (req, res) => {
  if (notes.length > 0) {
    return res.send(notes);
  }
  res.send("no note found or not yet created!");
});

// get single note
app.get("/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id, 10);
  const note = notes.find((note) => note.id === noteId);
  if (note) {
    res.status(200).send(note);
  } else {
    res.status(400).send("note not found");
  }
});

// add note
app.post("/notes", async (req, res) => {
  const note = new Note(req.body);
  //   notes = [...notes, note];
  // notes.push(note);
  try {
    await note.save();
    res.send(note);
  } catch (err) {
    res.status(500).send(err.errors.title.message);
  }
});

// update note
app.put("/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  const allNotes = req.body;
  const infoKeys = Object.keys(allNotes);
  const allowedForUpdate = ["title", "description"];
  try {
    const isAllowed = infoKeys.every((update) =>
      allowedForUpdate.includes(update)
    );
    if (!isAllowed) {
      return res.status(404).send("invalid operation!");
    }
    const note = notes.find((note) => note.id === noteId);
    if (note) {
      notes = notes.map((note) => {
        if (note.id === noteId) {
          return {
            ...note,
            ...allNotes,
          };
        } else {
          return note;
        }
      });
    }
    res.send(notes);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// delete note
app.delete("/notes/:id", (req, res) => {
  const noteId = parseInt(req.params.id);
  try {
    const note = notes.find((note) => note.id === noteId);
    if (note) {
      notes = notes.filter((note) => note.id !== noteId);
      res.status(200).send(notes);
    } else {
      res.status(404).send("Note not found");
    }
  } catch (e) {
    res.status(500).send("internal server error");
  }
});
// not found
app.get("*", (req, res) => {
  res.status(404).send("Not Found 404");
});

// server
app.listen(port, () => {
  console.log("server is running!");
});
