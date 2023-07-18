import mongoose from 'mongoose';

const conn = async (): Promise<string> => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://rohansingh9675:Sohansingh9675@cluster0.h4gigep.mongodb.net/test?retryWrites=true&w=majority"
    );

    if (!conn) {
      return "not connected";
    }

    console.log("Connected to the database");
    return "connected";
  } catch (err) {
    console.log(err);
    throw new Error("Error connecting to the database");
  }
};

export default conn;
