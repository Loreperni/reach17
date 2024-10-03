import { DataTypes } from "sequelize";
import sequelize from "./index.js";
import slugify from "slugify";

const School = sequelize.define("School", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  shortDescription: {
    type: DataTypes.STRING(250),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 250],
    },
  },
  longDescription: {
    type: DataTypes.TEXT,
  },
});

School.beforeCreate((school) => {
  school.slug = slugify(school.name, { lower: true, strict: true });
});

export default School;
