import mongoose from "mongoose";

mongoose.set("strictQuery", false);


export const connect =async() =>{
  try {
    await mongoose.connect(
      "mongodb+srv://gurukiranprofessional:AjMDp06mtGp1ZRpX@cluster0.lz9no.mongodb.net/analytical_dashboard?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Successfully connected to the database");
  } catch (err) {
    console.error("Unable to connect to the database: ", err);
    throw err;
  }
}

