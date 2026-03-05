import mongoose, { Schema, model, models } from "mongoose";

interface IUser {
  name: string;
  email: string;
  password: string;
  studentClass: number;
  role: string;
  img: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    studentClass: {
      type: Number,
      required: true,
      min: 6,
      max: 11,
    },

    role: {
      type: String,
    },

    img: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>("User", userSchema);

export default User;