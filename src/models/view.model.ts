import mongoose, { Schema, Document } from "mongoose";

export interface IView extends Document {
  movieId: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
  referer?: string;
}

const ViewSchema: Schema = new Schema(
  {
    movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    ip: String,
    userAgent: String,
    referer: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IView>("View", ViewSchema);
