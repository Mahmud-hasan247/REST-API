const { validationResult } = require("express-validator");

// import data model
const Note = require("../models/notes");

// get all notes
module.exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.send(notes);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// get single note
module.exports.getSingleNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  const noteId = req.params.id;
  try {
    const note = await Note.findById(noteId);
    if (!note) return res.send("note not found");
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
};

// add note
module.exports.addNote = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  try {
    const note = new Note(req.body);
    await note.save();
    res.send(note);
  } catch (err) {
    res.status(500).send(err.errors.title.message);
  }
};

// update note
module.exports.updateNote = async (req, res) => {
  const noteId = req.params.id;
  const infoKeys = Object.keys(req.body);
  const allowedForUpdate = ["title", "description"];
  const isAllowed = infoKeys.every((update) =>
    allowedForUpdate.includes(update)
  );
  if (!isAllowed) return res.status(400).send("Invalid request");
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).send(errors.array());
  try {
    const note = await Note.findByIdAndUpdate(noteId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) return res.status(404).send("Note not found");
    res.send(note);
  } catch (err) {
    res.status(500).send(err);
  }
};

// delete note
module.exports.deleteNote = async (req, res) => {
  const noteId = req.params.id;
  const error = validationResult(req);
  if (!error.isEmpty()) return res.status(404).send(error);
  try {
    const note = await Note.findByIdAndDelete(noteId);
    if (!note) return res.status(500).send("note not found");
    res.send(note);
  } catch (err) {
    res.status(400).send(err);
  }
};
