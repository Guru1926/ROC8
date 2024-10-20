
import mongoose from "mongoose";

const AnalyticalDataSchema = new mongoose.Schema({
  "Day":Date,
  "Age": String,
  "Gender": String,
  "A": Number,
  "B": Number,
  "C": Number,
  "D": Number,
  "E": Number,
  "F": Number},
  {
  timestamp: { type: Date, default: Date.now },
});

 const Analytics = new mongoose.model('Analytics', AnalyticalDataSchema);
 export default Analytics