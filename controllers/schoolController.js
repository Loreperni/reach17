import School from "../models/schoolModel.js";
import Course from "../models/courseModel.js";
import {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";
import { body } from "express-validator";
import catchAsync from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";

const schoolValidations = [
  body("name").notEmpty().withMessage("Name is required"),
  body("shortDescription")
    .notEmpty()
    .withMessage("Short description is required")
    .isLength({ max: 250 })
    .withMessage("Short description must be at most 250 characters"),
  body("longDescription")
    .optional()
    .notEmpty()
    .withMessage("Long description cannot be empty"),
];

export const getAllSchools = getAll(School);
export const getOneSchool = getOne(School);
export const createSchool = createOne(School, schoolValidations);
export const updateSchool = updateOne(
  School,
  schoolValidations.map((validation) => validation.optional())
);
export const deleteSchool = deleteOne(School);

export const getAllSchoolSubjects = catchAsync(async (req, res, next) => {
  const school = await School.findOne({ where: { slug: req.params.slug } });
  if (!school) {
    return next(new AppError("No school found with that slug", 404));
  }

  const courses = await Course.findAll({
    where: { SchoolId: school.id },
    attributes: ["subject"],
    group: ["subject"],
  });

  const subjects = courses.map((course) => course.subject);

  res.status(200).json({
    status: "success",
    results: subjects.length,
    data: { subjects },
  });
});
