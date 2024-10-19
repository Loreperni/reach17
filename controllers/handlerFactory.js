import { AppError } from "../utils/appError.js";
import { body, validationResult } from "express-validator";
import { APIFeatures } from "../utils/APIFeatures.js";

export const createOne = (Model, validations = []) => [
  ...validations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError("Validation error", 400, errors.array()));
    }
    next();
  },
  async (req, res, next) => {
    try {
      const doc = await Model.create(req.body);
      res.status(201).json({
        status: "success",
        data: { data: doc },
      });
    } catch (error) {
      next(error);
    }
  },
];

export const getOne = (Model, popOptions) => async (req, res, next) => {
  try {
    let query = req.params.slug
      ? Model.findOne({ where: { slug: req.params.slug } })
      : Model.findByPk(req.params.id);

    if (popOptions) query = query.include(popOptions);

    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: { data: doc },
    });
  } catch (error) {
    next(error);
  }
};

export const getAll = (Model) => async (req, res, next) => {
  try {
    const features = new APIFeatures(Model, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const { rows, count } = await features.query;

    res.status(200).json({
      status: "success",
      results: rows.length,
      totalPages: Math.ceil(count / features.limit),
      currentPage: features.page,
      data: { data: rows },
    });
  } catch (error) {
    next(error);
  }
};

export const updateOne = (Model, validations = []) => [
  ...validations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new AppError("Validation error", 400, errors.array()));
    }
    next();
  },
  async (req, res, next) => {
    try {
      let doc = req.params.slug
        ? await Model.findOne({ where: { slug: req.params.slug } })
        : await Model.findByPk(req.params.id);

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }

      doc = await doc.update(req.body);

      res.status(200).json({
        status: "success",
        data: { data: doc },
      });
    } catch (error) {
      next(error);
    }
  },
];

export const deleteOne = (Model) => async (req, res, next) => {
  try {
    let doc = req.params.slug
      ? await Model.findOne({ where: { slug: req.params.slug } })
      : await Model.findByPk(req.params.id);

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    await doc.destroy();

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
