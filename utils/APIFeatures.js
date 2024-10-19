import { Op } from "sequelize";

export class APIFeatures {
  constructor(Model, queryString) {
    this.Model = Model;
    this.queryString = queryString;
    this.query = Model.findAndCountAll();
    this.page = parseInt(queryString.page, 10) || 1;
    this.limit = parseInt(queryString.limit, 10) || 10;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const whereClause = {};
    Object.keys(queryObj).forEach((key) => {
      if (typeof queryObj[key] === "string") {
        whereClause[key] = { [Op.iLike]: `%${queryObj[key]}%` };
      } else {
        whereClause[key] = queryObj[key];
      }
    });

    this.query.where = whereClause;
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",");
      this.query.order = sortBy.map((field) =>
        field.startsWith("-") ? [field.slice(1), "DESC"] : [field, "ASC"]
      );
    } else {
      this.query.order = [["createdAt", "DESC"]];
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",");
      this.query.attributes = fields;
    } else {
      this.query.attributes = { exclude: ["__v"] };
    }
    return this;
  }

  paginate() {
    const offset = (this.page - 1) * this.limit;
    this.query.offset = offset;
    this.query.limit = this.limit;
    return this;
  }
}