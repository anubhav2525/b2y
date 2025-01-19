import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface Interview extends Document {
  applicationId: ObjectId;
  interviewDate?: Date;
  interviewTime?: Date;
  interviewNotes?: string;
  interviewFeedback?: string;
  interviewLocation: string;
  interviewStatus: "Scheduled" | "Completed" | "Cancelled";
  rejectionReason?: string;
  candidateRating?: number;
  offerDate?: Date;
}

const InterviewSchema = new Schema<Interview>(
  {
    applicationId: {
      type: Schema.Types.ObjectId,
      ref: "JobApplication",
      required: [true, "Application ID is required"],
    },
    interviewDate: {
      type: Date,
    },
    interviewTime: {
      type: Date,
    },
    interviewNotes: {
      type: String,
      trim: true,
    },
    interviewFeedback: {
      type: String,
      trim: true,
    },
    interviewLocation: {
      type: String,
      trim: true,
    },
    interviewStatus: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    candidateRating: {
      type: Number,
    },
    offerDate: {
      type: Date,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "lastUpdate" } }
);

const InterviewModel =
  (mongoose.models.Interview as mongoose.Model<Interview>) ||
  mongoose.model<Interview>("Interview", InterviewSchema);

export default InterviewModel;
