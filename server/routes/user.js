import express from "express";

import {
  deleteUser,
  userreq,
  addUser,
  getTeacher,
  getStudent,
  editUser,
} from "../controllers/user.js";

const router = express.Router();

router.get("/userreq", userreq);
router.post("/addUser", addUser);
router.delete("/deleteUser/:table/:id", deleteUser);
router.delete("/deleteStudent/:table/:id", deleteUser);
router.delete("/deleteTeacher/:table/:id", deleteUser);
router.get("/getStudent", getStudent);
router.get("/getTeacher", getTeacher);
router.put("/editUser/:id", editUser);

export default router;
