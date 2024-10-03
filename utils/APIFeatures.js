import { Op } from "sequelize";

export class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    const stringFields = [
      "name",
      "shortDescription",
      "longDescription",
      "slug",
    ];
    const whereClause = {};

    Object.keys(queryObj).forEach((key) => {
      if (stringFields.includes(key)) {
        whereClause[key] = { [Op.iLike]: `%${queryObj[key]}%` };
      } else {
        whereClause[key] = queryObj[key];
      }
    });

    this.query = this.query.where(whereClause);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",");
      this.query = this.query.order(
        sortBy.map((field) =>
          field.startsWith("-") ? [field.slice(1), "DESC"] : [field, "ASC"]
        )
      );
    } else {
      this.query = this.query.order([["createdAt", "DESC"]]);
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",");
      this.query = this.query.attributes(fields);
    } else {
      this.query = this.query.attributes({ exclude: ["__v"] });
    }
    return this;
  }

  paginate() {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 50;
    const offset = (page - 1) * limit;
    this.query = this.query.offset(offset).limit(limit);
    return this;
  }
}
