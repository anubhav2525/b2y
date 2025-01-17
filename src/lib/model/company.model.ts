import mongoose, {Schema, Document, ObjectId} from "mongoose";

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
    teamSize?: "0-10" | "10-20" | "20-30" | "30-40" | "40-50" | "50-100" | "100-200";
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
    createdAt: Date;
    lastUpdate: Date;
}

const CompanySchema = new Schema<Company>({
        companyName: {
            type: String,
            trim: true,
            unique: true,
            minlength: [3, "Company name min 3 characters"],
            maxlength: [50, "Company name max 50 characters"]
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
            maxlength: [200, "About max 200 characters"]
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
            enum: ["0-10" | "10-20" | "20-30" | "30-40" | "40-50" | "50-100" | "100-200"],
            default: "10-20"
        },
        companyWebsite: {
            type: String,
            trim: true,
        },
        companyEstablished: {
            type: String,
            trim: true,
            length: [10, "Established date must be 10 characters"]
        }, companyVision: {
            type: String,
            minlength: [10, "Vision min 10 characters"],
            maxlength: [200, "Vision max 200 characters"]
        },
        companyContactNumber: {
            type: String,
            minlength: [9, "Contact number min 9 characters"],
            maxlength: [15, "Contact number max 15 characters"]
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
        companyAddress: {
            street: {
                type: String,
                maxlength: [200, "Street max 200 characters"],
                trim: true,
            },
            city: {
                type: String,
                maxlength: [20, "City max 20 characters"],
                trim: true,
            },
            pinCode: {
                type: String,
                length: [6, "Pin code must be 6 digits"],
                trim: true,
            },
            country: {
                type: String,
                trim: true,
                maxlength: [30, "Country max 30 characters"],
            },
            state: {
                type: String,
                trim: true,
                maxlength: [20, "State max 20 characters"],
            }
        },
        socialPlatforms: [{
            platform: {
                type: String,
                lowercase: true,
                trim: true,
            },
            url: {
                type: String,
                trim: true
            }
        }],
        employeesId: [
            {
                type: ObjectId,
                trim: true
            }
        ],
        verificationStatus: {
            type: String,
            enum: ["Pending", "Verified", "Rejected"],
            trim:
                true,
            default:
                "Pending"
        },
        createdAt: {
            type: Date,
            default:
            Date.now,
        }
        ,
        lastUpdate: {
            type: Date,
            default:
            Date.now,
        }
        ,
    })
;

const CompanyModel = (mongoose.models.Company as mongoose.Model<Company>) ||
    mongoose.model<Company>("Company", CompanySchema);

export default CompanyModel;

/*
  {
    "companyName": "Tech Innovators Ltd",
    "companyLogoUrl": "https://example.com/logos/tech-innovators-logo.png",
    "companyBannerUrl": "https://example.com/banners/tech-innovators-banner.png",
    "companyAbout": "A cutting-edge technology company focused on delivering innovative solutions to global challenges.",
    "organizationType": "Private",
    "industryType": "Information Technology",
    "teamSize": "50-100",
    "companyWebsite": "https://techinnovators.com",
    "companyEstablished": "2015-06-01",
    "companyVision": "To revolutionize the tech industry by setting new standards in innovation and excellence.",
    "companyContactNumber": "+11234567890",
    "companyEmailAddress": "contact@techinnovators.com",
    "companyAddress": {
      "street": "123 Innovation Drive",
      "city": "San Francisco",
      "pinCode": "94107",
      "state": "California",
      "country": "United States"
    },
    "socialPlatforms": [
      {
        "platform": "linkedin",
        "url": "https://linkedin.com/company/techinnovators"
      },
      {
        "platform": "twitter",
        "url": "https://twitter.com/techinnovators"
      }
    ],
    "employeesId": [
      "64a9a7c72a12f90bfc1a7891",
      "64a9a7c72a12f90bfc1a7892"
    ],
      "verificationStatus": "Pending",
    "createdAt": "2023-01-01T10:00:00.000Z",
    "lastUpdate": "2023-12-01T15:00:00.000Z"
  }

 */