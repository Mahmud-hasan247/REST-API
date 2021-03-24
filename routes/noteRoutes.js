const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

//  Import controllers
const {
  getAllNotes,
  getSingleNote,
  addNote,
  updateNote,
  deleteNote,
} = require("../controller/controller");

// get all notes
router.get("/", getAllNotes);

// get single note
router.get("/:id", getSingleNote, check("id", "ID is invalid").isMongoId());

// add note
router.post(
  "/",
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
router.put(
  "/:id",
  [
    check("id", "ID is Invalid").isMongoId(),
    check("title", "Title is required").optional().notEmpty(),
    check("description", "Description is required").optional().notEmpty(),
  ],
  updateNote
);

// delete note
router.delete("/:id", check("id", "Id is invalid").isMongoId(), deleteNote);

module.exports = router;
