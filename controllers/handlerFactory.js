import { AppError } from "../utils/appError.js";
import { APIFeatures } from "../utils/APIFeatures.js";

export const createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: { data: doc },
    });
  } catch (error) {
    next(error);
  }
};

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
    const features = new APIFeatures(Model, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query;

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
