import express from "express";
import {
  addNote,
  deleteNote,
  getNotesByTeacher,
  getNoteById,
  editNote,
  getNotesByFaculty,
  getNotes,
} from "../controllers/note.js";

const router = express.Router();

router.post("/addNote", addNote);
router.put("/editNote/:noteId", editNote);
router.get("/getNotes", getNotes);
router.get("/getNotesByFaculty", getNotesByFaculty);
router.get("/getNotesByTeacher", getNotesByTeacher);
router.get("/getNoteById/:id", getNoteById);
router.delete("/deleteNote", deleteNote);

export default router;
