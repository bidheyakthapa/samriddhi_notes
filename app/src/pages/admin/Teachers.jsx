import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import Toast from "../../components/Toast";
import EditForm from "../../components/EditForm";
import Popup from "../../components/Popup";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/user/getTeacher"
        );
        setTeachers(response.data);
      } catch (err) {
        setError("Error fetching teachers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const columns = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Faculty", key: "faculty" },
  ];

  const handleDelete = async (row) => {
    try {
      if (studentToDelete) {
        await axios.delete(
          `http://localhost:8800/api/user/deleteTeacher/users/${row.id}`
        );
        setTeachers(teachers.filter((item) => item.id !== row.id));
        setToast({
          status: "success",
          message: "Teacher deleted successfully!",
        });
      }
    } catch (error) {
      setToast({
        status: "error",
        message: error.response
          ? error.response.data
          : "Failed to delete teacher.",
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

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (updatedData) => {
    try {
      console.log("Updated Data:", updatedData);
      await axios.put(
        `http://localhost:8800/api/user/editUser/${updatedData.id}`,
        updatedData
      );
      if (updatedData.role !== "teacher") {
        setTeachers(
          teachers.filter((teacher) => teacher.id !== updatedData.id)
        );
      } else {
        setTeachers(
          teachers.map((teacher) =>
            teacher.id === updatedData.id ? updatedData : teacher
          )
        );
      }
      setIsFormOpen(false);
      setToast({ status: "success", message: "Teacher updated successfully!" });
    } catch (error) {
      setToast({
        status: "error",
        message: "Failed to update teacher. Please try again.",
      });
    }
  };

  const handleToastClose = () => {
    setToast(null);
  };

  if (loading) {
    return <div>Loading teachers...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (teachers.length === 0) {
    return <div>No teachers found.</div>;
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
    <div className="teachers">
      <h1 style={{ marginTop: "15px" }}>Teachers</h1>
      <Table columns={columns} data={teachers} actions={actions} />
      {toast && (
        <Toast
          status={toast.status}
          message={toast.message}
          onClose={handleToastClose}
        />
      )}

      {/* Conditionally render the Edit Form */}
      {isFormOpen && selectedTeacher && (
        <EditForm
          data={selectedTeacher}
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

export default Teachers;
