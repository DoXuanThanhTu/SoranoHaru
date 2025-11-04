import mongoose, { Schema, Document } from "mongoose";

export interface IMovie extends Document {
  slug: string;
  name: string;
  originName?: string;
  alternativeNames?: string[];
  description?: string;
  content?: string;
  type: string;
  status?: string;
  year?: number;
  duration?: string;
  quality?: string;
  language?: string;
  viewCount: number;
  thumbUrl?: string;
  posterUrl?: string;
  trailerUrl?: string;
  categoryIds: string[];
  countryIds: string[];
  actor?: string[];
  director?: string[];
  tmdb?: object;
  imdb?: object;
  episodeCount?: number;
  latestEpisode?: string;
  seo?: object;
  breadcrumbs?: object[];
}

const MovieSchema = new Schema(
  {
    slug: { type: String, required: true },
    name: { type: String, required: true },
    originName: String,
    alternativeNames: [String],
    description: String,
    content: String,
    type: { type: String, required: true },
    status: String,
    year: Number,
    duration: String,
    quality: String,
    language: String,
    viewCount: { type: Number, default: 0 },
    thumbUrl: String,
    posterUrl: String,
    trailerUrl: String,
    categoryIds: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    countryIds: [{ type: Schema.Types.ObjectId, ref: "Country" }],
    actor: [String],
    director: [String],
    tmdb: Object,
    imdb: Object,
    episodeCount: Number,
    latestEpisode: String,
    seo: Object,
    breadcrumbs: [Object],

    // 🔽 Các trường mới thêm:
    featured: { type: Boolean, default: false }, // phim đề cử
    isFavorite: { type: Boolean, default: false }, // được yêu thích
    viewsToday: { type: Number, default: 0 },
    viewsMonth: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IMovie>("Movie", MovieSchema);
