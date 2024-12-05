import React from "react";
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
    noteOwnerId: 1,
    role: "student",
  },
];

const user = {
  id: 1, // Current logged-in user ID
  role: "teacher", // Current user's role
};

const MyNotes = () => {
  return (
    <div className="cards">
      {notes
        .filter((note) => {
          // Show notes if user is a student or if the teacher owns the note
          return (
            user.role === "student" ||
            (user.role === "teacher" && user.id === note.noteOwnerId)
          );
        })
        .map((note) => (
          <Card
            key={note.id}
            title={note.title}
            description={note.description}
            link={note.link}
            userId={user.id}
            noteOwnerId={note.noteOwnerId}
            role={user.role}
          />
        ))}
    </div>
  );
};

export default MyNotes;
