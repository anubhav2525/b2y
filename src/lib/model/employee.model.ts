import mongoose, {Schema, Document, ObjectId} from "mongoose";
import {Company} from "@/lib/model/company.model";

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

const EmployeeSchema = new Schema<Employee>({
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
        match: [/^\d{10}$/, "Contact number must be a valid 10-digit number"],
    },
    alternateContactNumber: {
        type: String,
        trim: true,
        match: [/^\d{10}$/, "Alternate contact number must be a valid 10-digit number"],
    },
    emailAddress: {
        type: String,
        required: [true, "Email address is required"],
        trim: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Email address must be a valid email"],
    },
    employmentType: {
        type: String,
        enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
        default: "Full-Time",
    },
    maritalStatus: {
        type: String,
        enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    socialPlatforms: [
        {
            platform: {type: String, required: true},
            url: {type: String, required: true},
        },
    ],
    address: {
        city: {type: String, trim: true},
        street: {type: String, trim: true},
        pinCode: {type: String, trim: true},
        state: {type: String, trim: true},
        country: {type: String, trim: true},
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
        start: {type: String, trim: true},
        end: {type: String, trim: true},
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    lastUpdate: {
        type: Date,
        default: Date.now,
    },
});
const EmployeeModel = (mongoose.models.Employee as mongoose.Model<Employee>) ||
    mongoose.model<Employee>("Employee", EmployeeSchema);

export default EmployeeModel;

/*
{
  "companyId": "63e17c4e9a1b9c001c2f9d12",
  "companyName": "Tech Innovators Inc.",
  "fullName": "John Doe",
  "contactNumber": "9876543210",
  "alternateContactNumber": "8765432109",
  "emailAddress": "johndoe@example.com",
  "employmentType": "Full-Time",
  "maritalStatus": "Single",
  "socialPlatforms": [
    {
      "platform": "LinkedIn",
      "url": "https://linkedin.com/in/johndoe"
    },
    {
      "platform": "Twitter",
      "url": "https://twitter.com/johndoe"
    }
  ],
  "address": {
    "city": "San Francisco",
    "street": "123 Main Street",
    "pinCode": "94105",
    "state": "California",
    "country": "USA"
  },
  "vacanciesId": [
    "63e17c4e9a1b9c001c2f9d14",
    "63e17c4e9a1b9c001c2f9d15"
  ],
  "designation": "Senior Software Engineer",
  "department": "Engineering",
  "profileUrl": "https://example.com/profiles/johndoe",
  "gender": "Male",
  "dateOfBirth": "1990-06-15",
  "employeeStatus": "Active",
  "workLocation": "Hybrid",
  "shiftTiming": {
    "start": "09:00",
    "end": "17:00"
  },
  "createdAt": "2025-01-18T10:00:00.000Z",
  "lastUpdate": "2025-01-18T10:00:00.000Z"
}

 */