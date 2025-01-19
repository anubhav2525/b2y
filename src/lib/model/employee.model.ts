import mongoose, { Schema, Document, ObjectId } from "mongoose";

interface SocialPlatform {
  platform: string;
  url: string;
}

interface Address {
  city?: string;
  street?: string;
  pinCode?: string;
  state?: string;
  country?: string;
}

export interface Employee extends Document {
  companyId: ObjectId;
  companyName: string;
  fullName: string;
  contactNumber: string;
  alternateContactNumber?: string;
  emailAddress: string;
  employmentType?: "Full-Time" | "Part-Time" | "Internship" | "Contract";
  maritalStatus?: "Single" | "Married" | "Divorced" | "Widowed";
  socialPlatforms?: SocialPlatform[];
  address?: Address;
  vacanciesId?: ObjectId[];
  designation: string;
  department: string;
  profileUrl?: string;
  gender?: string;
  dateOfBirth?: string;
  employeeStatus?: "Active" | "Inactive" | "On Leave";
  workLocation?: "Remote" | "On-Site" | "Hybrid";
  shiftTiming?: { start: string; end: string };
  createdAt: Date;
  lastUpdate: Date;
}

const EmployeeSchema = new Schema<Employee>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company ID is required"],
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
      required: [true, "Company name is required"],
      minlength: [3, "Company name must be at least 3 characters"],
      maxlength: [50, "Company name must not exceed 50 characters"],
    },
    fullName: {
      type: String,
      trim: true,
      required: [true, "Full name is required"],
      minlength: [3, "Full name must be at least 3 characters"],
      maxlength: [100, "Full name must not exceed 100 characters"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
      match: [
        /^\+?\d{10,15}$/,
        "Contact number must be valid with 10-15 digits",
      ],
    },
    alternateContactNumber: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          return !v || /^\+?\d{10,15}$/.test(v);
        },
        message: "Alternate contact number must be valid with 10-15 digits",
      },
    },
    emailAddress: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      unique: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Email address must be valid"],
    },
    employmentType: {
      type: String,
      enum: ["Full Time", "Part Time", "Internship", "Contract"],
      default: "Full Time",
    },
    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    socialPlatforms: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    address: {
      city: { type: String, trim: true },
      street: { type: String, trim: true },
      pinCode: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    vacanciesId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Vacancy",
      },
    ],
    designation: {
      type: String,
      trim: true,
      required: [true, "Designation is required"],
    },
    department: {
      type: String,
      trim: true,
      required: [true, "Department is required"],
    },
    profileUrl: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Non-Binary", "Other"],
    },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: function (value: Date) {
          return !value || value < new Date();
        },
        message: "Date of birth must be in the past",
      },
    },
    employeeStatus: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
    },
    workLocation: {
      type: String,
      enum: ["Remote", "On-Site", "Hybrid"],
      default: "On-Site",
    },
    shiftTiming: {
      start: {
        type: String,
        trim: true,
        match: [/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)"],
      },
      end: {
        type: String,
        trim: true,
        match: [/^\d{2}:\d{2}$/, "Invalid time format (HH:mm)"],
      },
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "lastUpdate" } }
);

const EmployeeModel =
  (mongoose.models.Employee as mongoose.Model<Employee>) ||
  mongoose.model<Employee>("Employee", EmployeeSchema);

export default EmployeeModel;
