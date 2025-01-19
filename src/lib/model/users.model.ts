import mongoose, { Schema, Document } from "mongoose";

export interface Users extends Document {
  email: string;
  password: string;
  fullName: string;
  provider: "credentials" | "google" | "github";
  role: "user" | "company" | "hr";
  token?: string;
  tokenExp?: number;
}

const UsersSchema = new Schema<Users>(
  {
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
      default: "user",
    },
    token: {
      type: String,
    },
    tokenExp: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "lastUpdate" },
  }
);

const UserModel =
  (mongoose.models.Users as mongoose.Model<Users>) ||
  mongoose.model<Users>("Users", UsersSchema);

export default UserModel;
