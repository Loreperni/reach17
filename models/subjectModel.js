import { DataTypes } from "sequelize";
import sequelize from "./index.js";
import slugify from "slugify";

const Subject = sequelize.define("Subject", {
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      len: [1, 50],
    },
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
});

Subject.beforeCreate((subject) => {
  subject.slug = slugify(subject.name, { lower: true });
});

Subject.beforeUpdate((subject) => {
  if (subject.changed("name")) {
    subject.slug = slugify(subject.name, { lower: true });
  }
});

export default Subject;