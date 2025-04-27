import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

connectDB()
  .then(() => {
    console.log("mongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`server is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Db connection faild", error.message);
  });
