import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  avatar?: string;
  email: string;
  passwordHash: string;
  role?: "user" | "admin" | "moderator";
  favorites?: mongoose.Types.ObjectId[];
  watched?: {
    movieId: mongoose.Types.ObjectId;
    episode?: string;
    progress?: number;
    updatedAt?: Date;
  }[];
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    avatar: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "Movie", default: [] }],
    watched: [
      {
        movieId: { type: Schema.Types.ObjectId, ref: "Movie" },
        episode: String,
        progress: Number,
        updatedAt: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
