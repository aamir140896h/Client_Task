import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB successfukky connectede");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
