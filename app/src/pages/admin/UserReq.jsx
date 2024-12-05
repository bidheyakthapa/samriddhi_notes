import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../components/Table";
import Toast from "../../components/Toast";

const UserReq = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const table = "userreq";

  const columns = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Faculty", key: "faculty" },
    { label: "Role", key: "role" },
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8800/api/user/userreq"
        );
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Accept action - Add user to the 'user' table
  const handleAccept = async (row) => {
    try {
      await axios.post("http://localhost:8800/api/user/addUser", row);
      // After successfully adding the user, remove it from the current request list
      setData(data.filter((item) => item.id !== row.id));
      setToast({ status: "success", message: "User accepted successfully!" });
    } catch (error) {
      setToast({
        status: "error",
        message: error.response
          ? error.response.data
          : "Failed to accept user request.",
      });
    }
  };

  const handleDelete = async (row) => {
    try {
      await axios.delete(
        `http://localhost:8800/api/user/deleteUser/${table}/${row.id}`
      );
      setData(data.filter((item) => item.id !== row.id));
      setToast({ status: "success", message: "User rejected successfully!" });
    } catch (error) {
      setToast({
        status: "error",
        message: error.response
          ? error.response.data
          : "Failed to delete user request.",
      });
    }
  };

  const actions = (row) => (
    <>
      <button className="accept" onClick={() => handleAccept(row)}>
        Accept
      </button>
      <button className="delete" onClick={() => handleDelete(row)}>
        Reject
      </button>
    </>
  );

  const handleToastClose = () => {
    setToast(null); // Reset toast after it disappears
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="userreq">
      <h1 style={{ marginTop: "15px" }}>User Requests</h1>
      {data.length > 0 ? (
        <Table columns={columns} data={data} actions={actions} />
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          No user requests.
        </div>
      )}

      {/* Conditionally render the Toast component */}
      {toast && (
        <Toast
          status={toast.status}
          message={toast.message}
          onClose={handleToastClose}
        />
      )}
    </div>
  );
};

export default UserReq;
