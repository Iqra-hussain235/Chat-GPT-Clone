import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  history: [
    {
      threadId: String,
      title: String,
    }
  ]
});

export default mongoose.model("User", userSchema);
