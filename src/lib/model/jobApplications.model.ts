import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface JobApplication extends Document {
  userId: ObjectId;
  vacancyId: ObjectId;
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected";
  resumeUrl?: string;
  coverLetterUrl?: string;
  notes?: string;
  salaryExpectation?: string;
  applicationSource?: string;
}

const JobApplicationSchema = new Schema<JobApplication>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User ID is required"],
    },
    vacancyId: {
      type: Schema.Types.ObjectId,
      ref: "Jobs",
      required: [true, "Job ID is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
    coverLetterUrl: {
      type: String,
      trim: true,
      maxlength: [2000, "Cover letter cannot exceed 2000 characters"],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },

    salaryExpectation: {
      type: String,
      trim: true,
    },
    applicationSource: {
      type: String,
      trim: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "lastUpdate" } }
);

const JobApplicationModel =
  (mongoose.models.JobApplication as mongoose.Model<JobApplication>) ||
  mongoose.model<JobApplication>("JobApplication", JobApplicationSchema);

export default JobApplicationModel;
