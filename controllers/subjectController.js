import Subject from "../models/subjectModel.js";
import {
  createOne,
  getOne,
  getAll,
  updateOne,
  deleteOne,
} from "./handlerFactory.js";
import { body } from "express-validator";

const subjectValidations = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name must be at most 50 characters"),
];

export const getAllSubjects = getAll(Subject);
export const getOneSubject = getOne(Subject);
export const createSubject = createOne(Subject, subjectValidations);
export const updateSubject = updateOne(
  Subject,
  subjectValidations.map((validation) => validation.optional())
);
export const deleteSubject = deleteOne(Subject);