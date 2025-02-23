import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import Toast from "../../components/Toast";
import EditForm from "../../components/EditForm";
import Popup from "../../components/Popup";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/user/getStudent"
        );
        setStudents(response.data);
      } catch (err) {
        setError("Error fetching students. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const columns = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Faculty", key: "faculty" },
  ];

  const handleDelete = async () => {
    try {
      if (studentToDelete) {
        await axios.delete(
          `http://localhost:8800/api/user/deleteStudent/users/${studentToDelete.id}`
        );
        setStudents(students.filter((item) => item.id !== studentToDelete.id));
        setToast({
          status: "success",
          message: "Student deleted successfully!",
        });
        setStudentToDelete(null);
      }
    } catch (error) {
      setToast({
        status: "error",
        message: error.response
          ? error.response.data
          : "Failed to delete student.",
      });
    }
    setShowPopup(false);
  };

  const actions = (row) => (
    <>
      <button className="edit" onClick={() => handleEdit(row)}>
        Edit
      </button>
      <button className="delete" onClick={() => handleAction("delete", row)}>
        Delete
      </button>
    </>
  );

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:8800/api/user/editUser/${updatedData.id}`,
        updatedData
      );

      if (updatedData.role !== "student") {
        setStudents(
          students.filter((student) => student.id !== updatedData.id)
        );
      } else {
        setStudents(
          students.map((student) =>
            student.id === updatedData.id ? updatedData : student
          )
        );
      }

      setIsFormOpen(false);
      setToast({ status: "success", message: "Student updated successfully!" });
    } catch (error) {
      setToast({
        status: "error",
        message: "Failed to update student. Please try again.",
      });
    }
  };

  const handleToastClose = () => {
    setToast(null);
  };

  if (loading) {
    return <div>Loading students...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (students.length === 0) {
    return <div>No students found.</div>;
  }

  const handleConfirmAction = () => {
    if (studentToDelete) {
      handleDelete();
    }
  };

  const handleAction = (type, row) => {
    if (type === "delete") {
      setStudentToDelete(row);
      setShowPopup(true);
    }
  };

  return (
    <div className="students">
      <h1 style={{ marginTop: "15px" }}>Students</h1>
      <Table columns={columns} data={students} actions={actions} />
      {toast && (
        <Toast
          status={toast.status}
          message={toast.message}
          onClose={handleToastClose}
        />
      )}

      {isFormOpen && selectedStudent && (
        <EditForm
          data={selectedStudent}
          onClose={() => setIsFormOpen(false)}
          handleEdit={handleFormSubmit}
        />
      )}

      {showPopup && (
        <Popup
          type="delete"
          onClose={() => setShowPopup(false)}
          onConfirm={handleConfirmAction}
        />
      )}
    </div>
  );
};

export default Students;
