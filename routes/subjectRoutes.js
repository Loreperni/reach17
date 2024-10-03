import express from "express";

import {
  createSubject,
  getAllSubjects,
  getOneSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/subjectController.js";

const router = express.Router();

//protect
router.get("/search", getAllSubjects);

router.route("/").get(getAllSubjects).post(createSubject);
router
  .route("/:slug")
  .get(getOneSubject)
  .patch(updateSubject)
  .delete(deleteSubject);

export default router;
