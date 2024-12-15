import React from "react";
import "../../styles/singleNote.css";
import Card from "../../components/Card";

const notes = [
  {
    id: 1,
    title: "React Basics",
    description: "An introduction to React fundamentals.",
    link: "https://reactjs.org/docs/getting-started.html",
    noteOwnerId: 1,
    role: "teacher",
  },
  {
    id: 2,
    title: "CSS Tips",
    description: "Best practices for writing CSS.",
    link: "https://developer.mozilla.org/en-US/docs/Learn/CSS",
    noteOwnerId: 2,
    role: "teacher",
  },
  {
    id: 2,
    title: "CSS Tips",
    description: "Best practices for writing CSS.",
    link: "https://developer.mozilla.org/en-US/docs/Learn/CSS",
    noteOwnerId: 2,
    role: "teacher",
  },
  {
    id: 2,
    title: "CSS Tips",
    description: "Best practices for writing CSS.",
    link: "https://developer.mozilla.org/en-US/docs/Learn/CSS",
    noteOwnerId: 2,
    role: "teacher",
  },
];

const SingleNote = () => {
  const note = notes.find((note) => note.id === 1); // Current note
  const relevantNotes = notes.filter((n) => n.id !== 1); // Other notes

  return (
    <div className="notesContainer">
      <div className="singleNote">
        <h1>{note ? note.title : "Note not found"}</h1>
        <p>{note ? note.description : ""}</p>
        <iframe src={note?.link} width={1000} height={700}></iframe>
      </div>
      <div className="relevantNotes">
        {relevantNotes.map((relNote) => (
          <Card
            key={relNote.id}
            title={relNote.title}
            description={relNote.description}
            link={relNote.link}
            userId={1} // Example userId; replace with actual userId
            noteOwnerId={relNote.noteOwnerId}
            role="student" // Example role; replace based on actual role
          />
        ))}
      </div>
    </div>
  );
};

export default SingleNote;
