import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import "../../styles/addNote.css";
import { AuthContext } from "../../context/authContext";
import Toast from "../../components/Toast";
import { useParams, useNavigate } from "react-router-dom";

const AddEditNote = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { noteId } = useParams();
  const navigate = useNavigate();

  const isEditMode = noteId !== undefined;

  useEffect(() => {
    // Reset form fields when switching to add mode
    if (!isEditMode) {
      setTitle("");
      setDesc("");
      setFile(null);
    }

    const fetchNote = async () => {
      if (isEditMode) {
        try {
          const res = await axios.get(
            `http://localhost:8800/api/note/getNoteById/${noteId}`
          );
          const note = res.data;
          setTitle(note.title);
          setDesc(note.description);
        } catch (err) {
          console.error("Failed to fetch note details", err);
          setToastMessage({
            status: "error",
            message: "Failed to load note details. Please try again.",
          });
        }
      }
    };
    fetchNote();
  }, [noteId, isEditMode]); // Re-run when noteId or isEditMode changes

  // Upload file function
  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8800/api/upload",
        formData
      );
      return res.data; // Returns the uploaded file name
    } catch (err) {
      console.error("File upload failed", err);
      setToastMessage({
        status: "error",
        message: "Failed to upload file. Please try again.",
      });
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setToastMessage(null);

    // Validate inputs
    if (!title) {
      setToastMessage({ status: "error", message: "Title is required" });
      return;
    }
    if (!file && !isEditMode) {
      setToastMessage({ status: "error", message: "Please upload a PDF file" });
      return;
    }

    try {
      let fileName = null;

      if (!isEditMode) {
        // Only upload the file if it's in "Add Note" mode
        fileName = await uploadFile();
      } else if (file) {
        // If in "Edit Note" mode and a new file is selected, upload the file
        fileName = await uploadFile();
      } else {
        // If no new file is selected in "Edit Note" mode, use the previous file name
        const res = await axios.get(
          `http://localhost:8800/api/note/getNoteById/${noteId}`
        );
        fileName = res.data.file; // Use the previous file value from the response
      }

      const noteData = {
        teacher_id: currentUser.id,
        title,
        description: desc,
        file: fileName || undefined, // Only send file if it's not in edit mode or a new file is uploaded
      };

      if (isEditMode) {
        await axios.put(
          `http://localhost:8800/api/note/editNote/${noteId}`,
          noteData
        );
        setToastMessage({
          status: "success",
          message: "Note updated successfully!",
        });

        // Navigate back after a successful update (go back to the previous page)
        navigate(-1); // This will take you back to the previous page only in edit mode
      } else {
        await axios.post("http://localhost:8800/api/note/addNote", noteData);
        setToastMessage({
          status: "success",
          message: "Note added successfully!",
        });
      }

      setTitle("");
      setDesc("");
      setFile(null);

      // navigate("/teacher/note");
    } catch (err) {
      console.error("Failed to add/update note", err);
      setToastMessage({
        status: "error",
        message: "Failed to add/update note. Please try again.",
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="addNote">
      <h1>{isEditMode ? "Edit Note" : "Add Note"}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="Enter the title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="desc">Description</label>
        <textarea
          id="desc"
          placeholder="Enter description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <label htmlFor="file">PDF File</label>
        <input
          type="file"
          accept="application/pdf"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <div className="form-buttons">
          <button type="submit">
            {isEditMode ? "Update Note" : "Add Note"}
          </button>

          {/* Only show the cancel button if it's in edit mode */}
          {isEditMode && (
            <button
              type="button"
              onClick={handleCancel}
              className=" cancel-button"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {toastMessage && (
        <Toast
          status={toastMessage.status}
          message={toastMessage.message}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

export default AddEditNote;
