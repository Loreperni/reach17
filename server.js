import dotenv from "dotenv";
import sequelize from "./models/index.js";

dotenv.config({ path: "./config.env" });

import app from "./app.js";

const port = process.env.PORT || 3003;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connected to database");

    if (process.env.NODE_ENV === "development") {
      await sequelize.sync({ force: true });
      console.log("Database synchronized (tables recreated)");
    } else {
      await sequelize.sync();
      console.log("Database synchronized");
    }

    app.listen(port, () => {
      console.log(
        `App running on port ${port} in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

startServer();

process.on("unhandledRejection", (err) => {
  console.log("💥UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.log("💥UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});
