const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      minlength: 4,
      maxlength: 15,
    },
    description: {
      type: String,
      required: true,
      minlength: 14,
      maxlength: 150,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", notesSchema);
module.exports = Note;
