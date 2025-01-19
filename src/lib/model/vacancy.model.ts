import mongoose, { Schema, Document, ObjectId } from "mongoose";

export interface Vacancy extends Document {
  companyId: ObjectId;
  jobCreatedBy: ObjectId;
  title: string;
  description: string;
  jobHighlight: string;
  department: string;
  employmentType: "Full Time" | "Part Time" | "Internship" | "Contract";
  jobLocation: string;
  salaryRange?: { min: number; max: number };
  requiredSkills: string[];
  experience?: { name: string; value: string }[];
  role: string;
  responsibilities: string[];
  educationRequirements?: string[];
  languagePreferences?: string[];
  vacanciesCount: number;
  perksAndBenefits?: string[];
  applicationDeadline?: Date;
  status: "Open" | "Closed" | "On Hold";
  jobType: "Permanent" | "Temporary" | "Contractual" | "Internship";
  shiftDetails?: {
    type: "Day" | "Night" | "Rotational";
    startTime?: string;
    endTime?: string;
  };
  travelRequirements?: boolean;
  additionalNotes?: string;
}

const VacancySchema = new Schema<Vacancy>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company ID is required"],
      trim: true,
    },
    jobCreatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: [true, "Employee ID (creator) is required"],
      trim: true,
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      minlength: [3, "Job title must be at least 3 characters"],
      maxlength: [100, "Job title must not exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      minlength: [10, "Job description must be at least 10 characters"],
    },
    jobHighlight: {
      type: String,
      required: [true, "Job highlight or short description is required"],
      trim: true,
      minlength: [5, "Job highlight must be at least 5 characters"],
      maxlength: [200, "Job highlight must not exceed 200 characters"],
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract"],
      required: [true, "Employment type is required"],
    },
    jobLocation: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },
    salaryRange: {
      min: { type: Number, min: 0, default: 0 },
      max: { type: Number, min: 0, default: 0 },
    },
    requiredSkills: {
      type: [String],
      required: [true, "Required skills are needed"],
      validate: [
        (val: string[]) => val.length > 0,
        "At least one skill is required",
      ],
    },
    experience: {
      type: [
        {
          name: { type: String, required: true },
          value: { type: Number, required: true, min: 0 },
        },
      ],
      required: [true, "Experience details are required"],
    },
    role: {
      type: String,
      required: [true, "Job role is required"],
      trim: true,
    },
    responsibilities: {
      type: [String],
      required: [true, "Job responsibilities are required"],
      validate: [
        (val: string[]) => val.length > 0,
        "At least one responsibility must be provided",
      ],
    },
    educationRequirements: {
      type: [String],
      default: [],
    },
    languagePreferences: {
      type: [String],
      default: [],
    },
    vacanciesCount: {
      type: Number,
      required: [true, "Number of vacancies is required"],
      min: [1, "Vacancies count must be at least 1"],
    },
    perksAndBenefits: {
      type: [String],
      default: [],
    },
    applicationDeadline: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "On Hold"],
      default: "Open",
    },
    jobType: {
      type: String,
      enum: ["Permanent", "Temporary", "Contractual", "Internship"],
      default: "Permanent",
    },
    shiftDetails: {
      type: {
        type: String,
        enum: ["Day", "Night", "Rotational"],
      },
      startTime: {
        type: String,
        match: [/^\d{2}:\d{2}$/, "Start time must be in HH:mm format"],
      },
      endTime: {
        type: String,
        match: [/^\d{2}:\d{2}$/, "End time must be in HH:mm format"],
      },
      validate: {
        validator: function (this: Vacancy) {
          if (this.shiftDetails && this.shiftDetails.type) {
            return this.shiftDetails.startTime && this.shiftDetails.endTime;
          }
          return true;
        },
        message:
          "Start time and end time are required when shift type is specified.",
      },
    },
    travelRequirements: {
      type: Boolean,
      default: false,
    },
    additionalNotes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "lastUpdate" },
  }
);

const VacancyModel =
  (mongoose.models.Vacancy as mongoose.Model<Vacancy>) ||
  mongoose.model<Vacancy>("Vacancy", VacancySchema);

export default VacancyModel;
