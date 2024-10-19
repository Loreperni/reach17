import Course from "../models/courseModel.js";
import {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";
import { body } from "express-validator";

const courseValidations = [
  body("name").notEmpty().withMessage("Name is required"),
  body("shortDescription")
    .notEmpty()
    .withMessage("Short description is required")
    .isLength({ max: 250 })
    .withMessage("Short description must be at most 250 characters"),
  body("longDescription")
    .notEmpty()
    .withMessage("Long description is required"),
  body("teachers").isArray().withMessage("Teachers must be an array"),
];

export const getAllCourses = getAll(Course);
export const getOneCourse = getOne(Course);
export const createCourse = createOne(Course, courseValidations);
export const updateCourse = updateOne(
  Course,
  courseValidations.map((validation) => validation.optional())
);
export const deleteCourse = deleteOne(Course);