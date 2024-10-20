import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      select: false,
    }
  },
  {
    timestamps: true,
  }
);
 const User = new mongoose.model("User", UserSchema);
export default User