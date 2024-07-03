import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
  blazer: {
    Chest: String,
    Waist: String,
    Shoulder: String,
    SleeveLength: String,
  },
  trouser: {
    Waist: String,
    Inseam: String,
    Hip: String,
    Thigh: String,
  },
  shirt: {
    Neck: String,
    Chest: String,
    Waist: String,
    SleeveLength: String,
  },
  halfcoat: {
    Chest: String,
    Waist: String,
    Shoulder: String,
    SleeveLength: String,
  },
  dress: {
    Bust: String,
    Waist: String,
    Hip: String,
    Length: String,
  },
  skirt: {
    Waist: String,
    Hip: String,
    Length: String,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    profileimg: {
      type: String,
      default: "",
    },
    coverimg: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    measurements: measurementSchema, // Nested measurement schema
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
