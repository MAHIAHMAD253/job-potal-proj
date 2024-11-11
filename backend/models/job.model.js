import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirement: [{ type: String, required: true }],
  salary: { type: Number, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  experienceLevel: { type: Number, required: true },
  position: { type: Number, required: true },
  company: { type: mongoose.Types.ObjectId, ref: "Company", required: true },
  created_by: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  applications: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Application",
    },
  ],
});

export const Job = mongoose.model("Job", jobSchema);
