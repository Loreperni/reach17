import { AppError } from "../utils/appError.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import { body, validationResult } from "express-validator";

export const createOne = (Model) => [
  body("name").notEmpty().withMessage("Name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
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

export const getOne = (Model) => async (req, res, next) => {
  try {
    let doc;
    if (req.params.slug) {
      doc = await Model.findOne({ where: { slug: req.params.slug } });
    } else {
      doc = await Model.findByPk(req.params.id);
    }
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
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const features = new APIFeatures(Model, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query.skip(skip).limit(limit);

    res.status(200).json({
      status: "success",
      results: docs.length,
      data: { data: docs },
    });
  } catch (error) {
    next(error);
  }
};



export const updateOne = (Model) => async (req, res, next) => {
  try {
    let doc;
    if (req.params.slug) {
      doc = await Model.findOne({ where: { slug: req.params.slug } });
    } else {
      doc = await Model.findByPk(req.params.id);
    }
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    await doc.update(req.body);
    res.status(200).json({
      status: "success",
      data: { data: doc },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOne = (Model) => async (req, res, next) => {
  try {
    let doc;
    if (req.params.slug) {
      doc = await Model.findOne({ where: { slug: req.params.slug } });
    } else {
      doc = await Model.findByPk(req.params.id);
    }
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
