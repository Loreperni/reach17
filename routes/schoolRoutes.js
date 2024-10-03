import express from "express";

import {
  createSchool,
  getAllSchools,
  getOneSchool,
  updateSchool,
  deleteSchool,
  getAllSchoolSubjects,
} from "../controllers/schoolController.js";

const router = express.Router();

//protect
router.get("/search", getAllSchools);
router.get("/:slug/subjects", getAllSchoolSubjects);

router.route("/").get(getAllSchools).post(createSchool);
router
  .route("/:slug")
  .get(getOneSchool)
  .patch(updateSchool)
  .delete(deleteSchool);

export default router;
