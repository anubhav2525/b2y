import mongoose, {Schema, Document, ObjectId} from "mongoose";

export interface JobApplication extends Document {
    userId: ObjectId;
    vacancyId: ObjectId;
    status: "Pending" | "Reviewed" | "Accepted" | "Rejected"; // Application status
    appliedAt: Date; // Date when the application was submitted
    resumeUrl?: string; // URL to the candidate's resume
    coverLetterUrl?: string; // Optional cover letter provided by the candidate
    notes?: string; // Optional notes for HR or company
    lastUpdated: Date; // Date when the application status was last updated
    interviewDate?: Date; // Date when the interview is scheduled
    interviewFeedback?: string; // Feedback from the interview
    interviewLocation: string; // Interview location (or online)
    interviewerId: ObjectId; // Reference to the interviewer (HR or hiring manager)
    interviewStatus: "Scheduled" | "Completed" | "Cancelled"; // Interview status
    recruiterId?: ObjectId;
    jobLocation?: string; // Location of the job applied for
    salaryExpectation?: string; // Candidate's expected salary
    applicationSource?: string; // Source of the application (e.g., LinkedIn, Referral)
    jobType?: "Full-time" | "Part-time" | "Remote" | "Contract"; // Type of the job
    rejectionReason?: string; // Reason for rejection if applicable
    candidateRating?: number; // Rating given by the interviewer or recruiter
    offerDate?: Date; // Date when the offer was made
}

const JobApplicationSchema = new Schema<JobApplication>({
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
    appliedAt: {
        type: Date,
        default: Date.now,
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
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
    interviewDate: {
        type: Date,
    },
    interviewFeedback: {
        type: String,
        trim: true,
        maxlength: [1000, "Interview feedback cannot exceed 1000 characters"],
    },
    interviewLocation: {
        type: String,
        required: true, // Ensures interview location is always provided
        maxlength: [100, "Interview location cannot exceed 100 characters"],
    },
    interviewerId: {
        type: Schema.Types.ObjectId,
        ref: "Users", // Reference to the HR or hiring manager
        required: true, // Ensures interviewer is always associated
    },
    interviewStatus: {
        type: String,
        enum: ["Scheduled", "Completed", "Cancelled"],
        required: true,
    },
    recruiterId: {
        type: Schema.Types.ObjectId,
        ref: "Users", // Reference to the HR or recruiter user
    },
    jobLocation: {
        type: String,
        maxlength: [100, "Job location cannot exceed 100 characters"],
        trim: true,
    },
    salaryExpectation: {
        type: String,
        trim: true,
    },
    applicationSource: {
        type: String,
        trim: true,
    },
    jobType: {
        type: String,
        enum: ["Full-time", "Part-time", "Remote", "Contract"],
    },
    rejectionReason: {
        type: String,
        trim: true,
    },
    candidateRating: {
        type: Number,
        min: 1,
        max: 5,
    },
    offerDate: {
        type: Date,
    },
});

const JobApplicationModel = (mongoose.models.JobApplication as mongoose.Model<JobApplication>) ||
    mongoose.model<JobApplication>("JobApplication", JobApplicationSchema);

export default JobApplicationModel;
