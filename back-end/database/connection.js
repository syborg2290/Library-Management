import mongoose from "mongoose";

 // DB config
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName:"lms_project"
    });
    console.log("Mongodb connected!");
  } catch (error) {
    throw new Error(error);
  }
};

export default dbConnection;
