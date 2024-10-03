import { DataTypes } from "sequelize";
import sequelize from "./index.js";

const Course = sequelize.define("Course", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 100],
    },
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
  },
  teachers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
});

export default Course;
