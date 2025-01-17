import mongoose, {Schema, Document} from "mongoose";

export interface Users extends Document {
    email: string;
    password: string;
    fullName: string;
    provider: "credentials" | "google" | "github";
    role: "user" | "company" | "hr";
    token?: number;
    tokenExp?: number;
    createdAt: Date;
    lastUpdated: Date;
}

const UsersSchema = new Schema<Users>({
    email: {
        type: String,
        required: [true, "Email is required"],
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
    password: {
        type: String,
        trim: true,
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        trim: true,
    },
    provider: {
        type: String,
        enum: ["credentials", "google", "github"],
        required: [true, "Provider is required"],
        default: "credentials",
    },
    role: {
        type: String,
        enum: ["user", "hr", "company"],
        required: [true, "Role is required"],
        default: "user"
    },
    token: {
        type: Number,
    },
    tokenExp: {
        type: Date,
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

const UserModel = (mongoose.models.Users as mongoose.Model<Users>) ||
    mongoose.model<Users>("Users", UsersSchema);

export default UserModel;

/*
[
  {
    "email": "john.doe@example.com",
    "password": "hashed_password_12345",
    "fullName": "John Doe",
    "provider": "credentials",
    "role": "user",
    "token": 123456,
    "tokenExp": "2025-01-20T12:00:00.000Z",
    "createdAt": "2025-01-15T10:00:00.000Z",
    "lastUpdate": "2025-01-18T14:00:00.000Z"
  },
  {
    "email": "jane.smith@gmail.com",
    "password": "hashed_password_abcde",
    "fullName": "Jane Smith",
    "provider": "google",
    "role": "hr",
    "createdAt": "2025-01-10T09:00:00.000Z",
    "lastUpdate": "2025-01-18T12:30:00.000Z"
  }
]

 */