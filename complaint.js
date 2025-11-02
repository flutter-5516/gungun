import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: { type: String, enum: ["waste", "animal", "streetlight", "roads", "drainage"], required: true },
  description: { type: String },
  imageUrl: { type: String },
  location: { type: String },
  status: { type: String, enum: ["pending", "in-progress", "resolved"], default: "pending" },
}, { timestamps: true });

export default mongoose.model("Complaint", complaintSchema);
