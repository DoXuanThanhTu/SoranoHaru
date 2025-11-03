import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
  movieId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  content: string;
  parentId?: mongoose.Types.ObjectId;
  likes?: number;
  dislikes?: number;
  meta?: object;
}

const CommentSchema: Schema = new Schema(
  {
    movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    parentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    meta: Object,
  },
  { timestamps: true }
);

export default mongoose.model<IComment>("Comment", CommentSchema);
