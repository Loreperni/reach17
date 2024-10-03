import Subject from "../models/subjectModel.js";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "./handlerFactory.js";

export const createSubject = createOne(Subject);
export const getAllSubjects = getAll(Subject);
export const getOneSubject = getOne(Subject);
export const updateSubject = updateOne(Subject);
export const deleteSubject = deleteOne(Subject);
