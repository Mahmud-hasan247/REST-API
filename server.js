const express = require("express");
const app = express();
app.use(express.json());
const port = 8000;

let notes = [
  {
    id: 1,
    title: "note number 1",
    description: "description no 1",
  },
  {
    id: 2,
    title: "note number 2",
    description: "description no 2",
  },
];

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
app.post("/notes", (req, res) => {
  const note = req.body;
  //   notes = [...notes, note];
  notes.push(note);
  res.send(notes);
});

// update note
app.put("/notes/:id", (req, res) => {
  const noteId = req.params.id;
});

// not found
app.get("*", (req, res) => {
  res.status(404).send("Not Found 404");
});

// server
app.listen(port, () => {
  console.log("server is running!");
});
