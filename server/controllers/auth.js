import { db } from "../db.js";
import bcrypt from "bcryptjs";
import Joi from "joi";

export const register = (req, res) => {
  // Validate Input
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    faculty: Joi.string().required(),
    role: Joi.string().valid("admin", "teacher", "student").required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  console.log("Received payload:", req.body);

  // Check Existing Users
  const q =
    "SELECT email FROM userreq WHERE email = ? UNION SELECT email FROM users WHERE email = ?;";

  db.query(q, [req.body.email, req.body.email], (err, data) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json("Something went wrong.");
    }
    if (data.length) return res.status(409).json("User already exists!");

    // Hash Password
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        console.error("Hashing Error:", err);
        return res.status(500).json("Error processing your request.");
      }

      // Insert User
      const q =
        "INSERT INTO userreq(`name`, `email`, `password`, `faculty`, `role`)VALUES(?)";
      const values = [
        req.body.name,
        req.body.email,
        hash,
        req.body.faculty,
        req.body.role,
      ];

      db.query(q, [values], (err, data) => {
        if (err) {
          console.error("Database Insert Error:", err);
          return res.status(500).json("Failed to register user.");
        }
        return res.status(201).json("User successfully created.");
      });
    });
  });
};
