import bcrypt from "bcryptjs";
import { db } from "./db.js";

const users = [
  {
    name: "Admin User",
    email: "admin@gmail.com",
    password: "admin123",
    faculty: "N/A",
    role: "admin",
  },
  {
    name: "Teacher User",
    email: "teacher@gmail.com",
    password: "teacher123",
    faculty: "Science",
    role: "teacher",
  },
  {
    name: "Student User",
    email: "student@gmail.com",
    password: "student123",
    faculty: "Science",
    role: "student",
  },
];

async function seedUsers() {
  try {
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const query = `INSERT INTO users (name, email, password, faculty, role) VALUES (?, ?, ?, ?, ?)`;
      const values = [
        user.name,
        user.email,
        hashedPassword,
        user.faculty,
        user.role,
      ];

      db.query(query, values, (err) => {
        if (err) {
          console.error("Error inserting user:", err);
        } else {
          console.log(`User with role ${user.role} inserted successfully.`);
        }
      });
    }
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    db.end();
  }
}

seedUsers();
