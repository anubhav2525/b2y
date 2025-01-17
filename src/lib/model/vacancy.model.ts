import mongoose, {Schema, Document, ObjectId} from "mongoose";

export interface Vacancy extends Document {
    companyId: ObjectId;
    createdBy: ObjectId;
    title: string;
    description: string;
    jobHighlight: string;
    department: string;
    employmentType: "Full-Time" | "Part-Time" | "Internship" | "Contract";
    location: string; // Job location
    salaryRange?: { min: number; max: number; }; // Optional salary range
    requiredSkills: string[]; // Skills required for the job
    experience?: { name: string; value: string }[];
    role: string;
    responsibilities: string[];
    educationRequirements?: string[];
    languagePreferences?: string[];
    vacanciesCount: number;
    perksAndBenefits?: string[];
    applicationDeadline?: Date;
    status: "Open" | "Closed" | "On-Hold";
    jobType: "Permanent" | "Temporary" | "Contractual" | "Internship";
    shiftDetails?: {
        type: "Day" | "Night" | "Rotational";
        startTime?: string;
        endTime?: string;
    };
    travelRequirements?: boolean;
    additionalNotes?: string;
    createdAt: Date;
    lastUpdate: Date;
}

const VacancySchema = new Schema<Vacancy>({
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "Company",
        required: [true, "Company ID is required"],
        trim: true,
    },
    createdBy: {
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
        enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
        required: [true, "Employment type is required"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        trim: true,
    },
    salaryRange: {
        min: {type: Number, min: 0},
        max: {type: Number, min: 0},
    },
    requiredSkills: {
        type: [String],
        required: [true, "Required skills are needed"],
        validate: [(val: string[]) => val.length > 0, "At least one skill is required"],
    },
    experience: {
        type: [
            {
                name: {type: String, required: true},
                value: {type: Number, required: true, min: 0},
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
        enum: ["Open", "Closed", "On-Hold"],
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
    },
    travelRequirements: {
        type: Boolean,
        default: false,
    },
    additionalNotes: {
        type: String,
        trim: true,
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

const VacancyModel =
    (mongoose.models.Vacancy as mongoose.Model<Vacancy>) ||
    mongoose.model<Vacancy>("Vacancy", VacancySchema);

export default VacancyModel;

/*
{
    "companyId": "63e17c4e9a1b9c001c2f9d12",
    "createdBy": "63e17c5f9a1b9c001c2f9d13",
    "title": "Software Engineer",
    "description": "We are looking for a talented Software Engineer to join our dynamic team and help us build high-quality, scalable applications.",
    "jobHighlight": "Opportunity to work with cutting-edge technologies in a collaborative environment.",
    "department": "Engineering",
    "employmentType": "Full-Time",
    "location": "San Francisco, CA",
    "salaryRange": {
    "min": 90000,
        "max": 120000,
        "currency": "USD"
},
    "requiredSkills": ["JavaScript", "Node.js", "React.js", "REST APIs", "MongoDB"],
    "experience": [
    {
        "name": "Years of Experience",
        "value": 3
    },
    {
        "name": "Team Leadership",
        "value": 1
    }
],
    "role": "Backend Developer",
    "responsibilities": [
    "Develop and maintain server-side applications.",
    "Collaborate with front-end developers to integrate user-facing elements.",
    "Design and optimize database schemas.",
    "Write efficient, reusable, and testable code.",
    "Participate in code reviews and mentor junior developers."
],
    "educationRequirements": [
    "Bachelor's degree in Computer Science or a related field"
],
    "languagePreferences": ["English"],
    "vacanciesCount": 2,
    "perksAndBenefits": [
    "Health insurance",
    "Flexible work hours",
    "Annual performance bonuses",
    "Professional development programs"
],
    "applicationDeadline": "2025-02-15T23:59:59.000Z",
    "status": "Open",
    "jobType": "Permanent",
    "shiftDetails": {
    "type": "Day",
        "startTime": "09:00",
        "endTime": "17:00"
},
    "travelRequirements": false,
    "additionalNotes": "Preference will be given to candidates with prior experience in cloud technologies.",
    "createdAt": "2025-01-18T10:00:00.000Z",
    "lastUpdate": "2025-01-18T10:00:00.000Z"
}

*/