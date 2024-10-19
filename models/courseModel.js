import { DataTypes } from "sequelize";
import sequelize from "./index.js";
import slugify from "slugify";

const Course = sequelize.define("Course", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100],
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
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  teachers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    validate: {
      isArray: (value) => {
        if (!Array.isArray(value)) {
          throw new Error("Teachers must be an array");
        }
      },
    },
  },
});

Course.beforeCreate((course) => {
  course.slug = slugify(course.name, { lower: true, strict: true });
});

Course.beforeUpdate((course) => {
  if (course.changed("name")) {
    course.slug = slugify(course.name, { lower: true, strict: true });
  }
});

export default Course;