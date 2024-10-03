import Course from "../models/courseModel.js";
import { AppError } from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllCourses = catchAsync(async (req, res) => {
  const courses = await Course.findAll();
  res.status(200).json({
    status: "success",
    results: courses.length,
    data: { courses },
  });
});

export const createCourse = catchAsync(async (req, res) => {
  const newCourse = await Course.create(req.body);
  res.status(201).json({
    status: "success",
    data: { course: newCourse },
  });
});

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

export const updateCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByPk(req.params.id);
  if (!course) {
    return next(new AppError("No course found with that ID", 404));
  }
  await course.update(req.body);
  res.status(200).json({
    status: "success",
    data: { course },
  });
});

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
