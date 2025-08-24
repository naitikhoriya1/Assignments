import mongoose, { Document } from "mongoose";

export interface IPost extends Document {
  text: string;
  author: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  comments: {
    text: string;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema<IPost>(
  {
    text: {
      type: String,
      required: [true, "Post text is required"],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        text: {
          type: String,
          required: true,
        },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true, // This will automatically add createdAt and updatedAt fields
  }
);

// Add index for better query performance
postSchema.index({ author: 1, createdAt: -1 });

export const Post = mongoose.model<IPost>("Post", postSchema);
