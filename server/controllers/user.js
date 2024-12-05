import { db } from "../db.js";
import Joi from "joi";

//Get data from userreq table
export const userreq = (req, res) => {
  const q = "SELECT * FROM userreq";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

//Add user in user table
export const addUser = (req, res) => {
  // Check if the user already exists based on the email
  const qCheck = "SELECT email FROM users WHERE email = ?";
  db.query(qCheck, [req.body.email], (err, data) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json("Something went wrong.");
    }

    // If user already exists, return a conflict response
    if (data.length) {
      return res.status(409).json("User already exists!");
    }

    // If the user doesn't exist, proceed to add the new user
    const qInsert =
      "INSERT INTO users(`name`, `email`, `password`, `faculty`, `role`) VALUES (?)";
    const values = [
      req.body.name,
      req.body.email,
      req.body.password,
      req.body.faculty,
      req.body.role,
    ];

    db.query(qInsert, [values], (err, data) => {
      if (err) {
        console.error("Database Insert Error:", err);
        return res.status(500).json("Failed to create user.");
      }

      // Delete the request from userreq after successful insertion
      const qDelete = "DELETE FROM userreq WHERE id = ?";
      db.query(qDelete, [req.body.id], (err, result) => {
        if (err) {
          console.error("Database Delete Error:", err);
          return res
            .status(500)
            .json("User added but failed to delete request.");
        }
        return res
          .status(201)
          .json("User successfully created and request removed.");
      });
    });
  });
};

//Delete user in user table
export const deleteUser = (req, res) => {
  const { table, id } = req.params;

  const allowedTables = ["userreq", "users"];
  if (!allowedTables.includes(table)) {
    return res.status(400).json("Invalid table.");
  }

  const q = `DELETE FROM ?? WHERE id = ?`;
  db.query(q, [table, id], (err, data) => {
    if (err) {
      console.error("Database Delete Error:", err);
      return res.status(500).json("Failed to delete record.");
    }
    return res.status(200).json("Record deleted successfully.");
  });
};

//Get students
export const getStudent = (req, res) => {
  const q = "SELECT * FROM users WHERE role ='STUDENT';";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

//Get teachers
export const getTeacher = (req, res) => {
  const q = "SELECT * FROM users WHERE role ='TEACHER';";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data);
  });
};

//Edit Students And Teachers

export const editUser = (req, res) => {
  // Define the schema for validation
  const userSchema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    faculty: Joi.string().valid("BCA", "CSIT").required(),
    role: Joi.string().valid("student", "teacher").required(),
  });

  // Validate req.body against the schema
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Prepare the query to update the user's data
  const q = `UPDATE users SET name = ?, email = ?, faculty = ?, role = ? WHERE id = ?`;

  const values = [
    req.body.name,
    req.body.email,
    req.body.faculty,
    req.body.role,
    req.body.id,
  ];

  // Execute the query to update the user's record
  db.query(q, values, (err, data) => {
    if (err) {
      console.error("Database Update Error:", err);
      return res.status(500).json("Failed to update record.");
    }
    return res.status(200).json("Record updated successfully.");
  });
};
