import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  title?: string;
  bio?: string;
  skills?: string[];
  experience?: {
    title: string;
    company: string;
    location?: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
  }[];
  education?: {
    school: string;
    degree: string;
    fieldOfStudy: string;
    from: Date;
    to?: Date;
    current: boolean;
    description?: string;
  }[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    experience: [
      {
        title: {
          type: String,
          required: true,
        },
        company: {
          type: String,
          required: true,
        },
        location: String,
        from: {
          type: Date,
          required: true,
        },
        to: Date,
        current: {
          type: Boolean,
          default: false,
        },
        description: String,
      },
    ],
    education: [
      {
        school: {
          type: String,
          required: true,
        },
        degree: {
          type: String,
          required: true,
        },
        fieldOfStudy: {
          type: String,
          required: true,
        },
        from: {
          type: Date,
          required: true,
        },
        to: Date,
        current: {
          type: Boolean,
          default: false,
        },
        description: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return false;
  }
};

// Add indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ skills: 1 });
userSchema.index({ "experience.company": 1 });
userSchema.index({ "education.school": 1 });

// Method to get public profile (exclude sensitive data)
userSchema.methods.toPublicProfile = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = mongoose.model<IUser>("User", userSchema);
