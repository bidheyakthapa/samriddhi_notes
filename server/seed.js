import bcrypt from "bcryptjs";
import { db } from "./db";

const seedData = async () => {
  try {
    const hashedPasswords = await Promise.all([
      bcrypt.hash("admin123", 10),
      bcrypt.hash("teacher123", 10),
      bcrypt.hash("student123", 10),
    ]);

    const users = [
      {
        name: "Admin",
        email: "admin@example.com",
        password: hashedPasswords[0],
        faculty: "admin",
        role: "admin",
      },
      {
        name: "Teacher",
        email: "teacher@example.com",
        password: hashedPasswords[1],
        faculty: "BCA",
        role: "teacher",
      },
      {
        name: "Student",
        email: "student@example.com",
        password: hashedPasswords[2],
        faculty: "BCA",
        role: "student",
      },
    ];

    for (const user of users) {
      const query =
        "INSERT INTO users (name, email, password, faculty, role) VALUES (?, ?, ?, ?, ?)";
      await new Promise((resolve, reject) => {
        db.query(
          query,
          [user.name, user.email, user.password, user.faculty, user.role],
          (err) => {
            if (err) reject(err);
            resolve();
          }
        );
      });
    }

    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    db.end();
  }
};

seedData();
