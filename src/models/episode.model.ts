import mongoose, { Schema, Document } from "mongoose";

export interface IEpisode extends Document {
  movieId: string;
  serverName: string;
  isAI?: boolean;
  priority?: number;
  serverData: {
    name: string;
    slug?: string;
    filename?: string;
    linkEmbed?: string;
    linkM3u8?: string;
    duration?: string;
    releaseDate?: Date;
  }[];
}

const EpisodeSchema: Schema = new Schema(
  {
    movieId: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    serverName: { type: String, required: true },
    isAI: Boolean,
    priority: Number,
    serverData: [
      {
        name: { type: String, required: true },
        slug: String,
        filename: String,
        linkEmbed: String,
        linkM3u8: String,
        duration: String,
        releaseDate: Date,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IEpisode>("Episode", EpisodeSchema);
