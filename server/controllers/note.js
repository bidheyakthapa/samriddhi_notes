import { db } from "../db.js";

export const addNote = (req, res) => {
  const q =
    "INSERT INTO notes (teacher_id, title, description, file) VALUES (?)";
  const values = [
    req.body.teacher_id,
    req.body.title,
    req.body.description,
    req.body.file,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json("Failed to add note.");
    }
    return res.status(200).json("Note added successfully");
  });
};

export const editNote = (req, res) => {
  const q =
    "UPDATE notes SET title = ?, description = ?, file = ? WHERE id = ? ";
  db.query(
    q,
    [req.body.title, req.body.description, req.body.file, req.params.noteId],
    (err, data) => {
      if (err) {
        console.error("Error: ", err);
        return res.status(500).json("Failed to update note.");
      }
      if (data.affectedRows === 0) {
        return res.status(404).json("Note not found.");
      }
      return res.status(200).json("Note updated successfully!");
    }
  );
};
export const getNotes = (req, res) => {
  const q = "Select id, teacher_id, title, description, file FROM notes";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json("Failed to get note.");
    }
    if (res.length === 0) {
      return res.status(404).json({
        message: "Note not avialble yet.",
      });
    }
    return res.status(200).json(data);
  });
};

export const getNotesByFaculty = (req, res) => {
  const { faculty } = req.query;

  const q =
    "SELECT notes.id, notes.title, notes.description, notes.file FROM notes JOIN users AS teachers ON teachers.id = notes.teacher_id WHERE teachers.faculty = ?";
  db.query(q, [faculty], (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json("Failed to get note.");
    }
    if (res.length === 0) {
      return res.status(404).json({
        message: "Notes are not avialble yet.",
      });
    }
    return res.status(200).json(data);
  });
};

export const getNotesByTeacher = (req, res) => {
  const { userId } = req.query;

  const q =
    "Select id, teacher_id, title, description, file FROM notes WHERE teacher_id = (?)";
  db.query(q, [userId], (err, data) => {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json("Failed to get note.");
    }
    return res.status(200).json(data);
  });
};

export const deleteNote = (req, res) => {
  const { noteId } = req.body;
  if (!noteId) {
    return res.status(400).json("Note ID is required.");
  }

  const q = "DELETE FROM notes WHERE id = ?";

  db.query(q, [noteId], (err, data) => {
    if (err) {
      console.error("Error: ", err);
      return res.status(500).json("Failed to delete note.");
    }
    if (data.affectedRows === 0) {
      return res.status(404).json("Note not found.");
    }
    return res.status(200).json("Note deleted successfully!");
  });
};

export const getNoteById = (req, res) => {
  const q = "SELECT * FROM notes WHERE id = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) {
      console.error("Error: ", err);
      return res.status(500).json("Failed to fetch note.");
    }
    return res.status(200).json(data[0]);
  });
};
