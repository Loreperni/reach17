import express from "express";

import {
  getAllCourses,
  createCourse,
  getOneCourse,
  deleteCourse,
  updateCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/search", getAllCourses);

router.route("/").get(getAllCourses).post(createCourse);
router.route("/:id").get(getOneCourse).patch(updateCourse).delete(deleteCourse);

export default router;
