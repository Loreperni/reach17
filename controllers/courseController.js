import Course from "../models/courseModel.js";
import { AppError } from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import { body, validationResult } from "express-validator";

export const getAllCourses = catchAsync(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  const courses = await Course.findAll({
    offset: skip,
    limit: limit,
  });

  res.status(200).json({
    status: "success",
    results: courses.length,
    data: { courses },
  });
});

export const createCourse = [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  catchAsync(async (req, res) => {
    const newCourse = await Course.create(req.body);
    res.status(201).json({
      status: "success",
      data: { course: newCourse },
    });
  }),
];


export const getOneCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: { course },
  });
});

export const updateCourse = [
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  catchAsync(async (req, res, next) => {
    const course = await Course.findByPk(req.params.id);
    if (!course) {
      return next(new AppError("No course found with that ID", 404));
    }
    await course.update(req.body);
    res.status(200).json({
      status: "success",
      data: { course },
    });
  }),
];

export const deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  await course.destroy();
  res.status(204).json({
    status: "success",
    data: null,
  });
});
