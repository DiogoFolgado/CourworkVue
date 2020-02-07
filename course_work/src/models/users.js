import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  userType: String,
});

export default mongoose.model("users", userSchema)
