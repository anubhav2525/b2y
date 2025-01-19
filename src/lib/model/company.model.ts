import mongoose, { Schema, Document, Types, ObjectId } from "mongoose";

interface SocialMedia {
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

export interface Company extends Document {
  companyName?: string;
  companyLogoUrl?: string;
  companyBannerUrl?: string;
  companyAbout?: string;
  organizationType?: string;
  industryType?: string;
  teamSize?:
    | "0-10"
    | "10-20"
    | "20-30"
    | "30-40"
    | "40-50"
    | "50-100"
    | "100-200";
  companyWebsite?: string;
  companyEstablished?: string;
  companyVision?: string;
  socialPlatforms?: SocialMedia[];
  companyAddress?: Address;
  companyEmailAddress?: string;
  companyContactNumber?: string;
  countryCode?: string;
  verificationStatus?: "Pending" | "Verified" | "Rejected";
  employeesId?: ObjectId[];
}

const AddressSchema = new Schema({
  street: {
    type: String,
    maxlength: [200, "Street max 200 characters"],
    trim: true,
  },
  city: { type: String, maxlength: [20, "City max 20 characters"], trim: true },
  pinCode: {
    type: String,
    minlength: [6, "Pin code must be 6 digits"],
    trim: true,
  },
  country: {
    type: String,
    maxlength: [30, "Country max 30 characters"],
    trim: true,
  },
  state: {
    type: String,
    maxlength: [20, "State max 20 characters"],
    trim: true,
  },
});

const SocialMediaSchema = new Schema({
  platform: { type: String, lowercase: true, trim: true },
  url: { type: String, trim: true },
});

const CompanySchema = new Schema<Company>(
  {
    companyName: {
      type: String,
      trim: true,
      unique: true,
      minlength: [3, "Company name min 3 characters"],
      maxlength: [50, "Company name max 50 characters"],
    },
    companyLogoUrl: {
      type: String,
      trim: true,
    },
    companyBannerUrl: {
      type: String,
      trim: true,
    },
    companyAbout: {
      type: String,
      trim: true,
      minlength: [10, "About min 10 characters"],
      maxlength: [200, "About max 200 characters"],
    },
    organizationType: {
      type: String,
      trim: true,
    },
    industryType: {
      type: String,
      trim: true,
    },
    teamSize: {
      type: String,
      trim: true,
      enum: ["0-10", "10-20", "20-30", "30-40", "40-50", "50-100", "100-200"],
      default: "10-20",
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    companyEstablished: {
      type: String,
      trim: true,
      minlength: [10, "Established date must be at least 10 characters"],
      maxlength: [10, "Established date must be at most 10 characters"],
    },
    companyVision: {
      type: String,
      minlength: [10, "Vision min 10 characters"],
      maxlength: [200, "Vision max 200 characters"],
    },
    companyContactNumber: {
      type: String,
      minlength: [9, "Contact number min 9 characters"],
      maxlength: [15, "Contact number max 15 characters"],
    },
    companyEmailAddress: {
      type: String,
      minlength: [10, "Email min 10 characters"],
      maxlength: [50, "Email max 50 characters"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v: string) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    companyAddress: AddressSchema,
    socialPlatforms: [SocialMediaSchema],
    employeesId: [
      {
        type: [Types.ObjectId],
        ref: "Employee",
      },
    ],
    verificationStatus: {
      type: String,
      enum: ["Pending", "Verified", "Rejected"],
      trim: true,
      default: "Pending",
    },
  },
  { timestamps: true }
);
const CompanyModel =
  (mongoose.models.Company as mongoose.Model<Company>) ||
  mongoose.model<Company>("Company", CompanySchema);

export default CompanyModel;
