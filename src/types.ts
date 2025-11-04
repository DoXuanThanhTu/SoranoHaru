// src/types/types.ts

/**
 * ===== Categories =====
 */
export type CategoryType = {
  id?: string;
  name: string;
  slug: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * ===== Countries =====
 */
export type CountryType = {
  id?: string;
  name: string;
  slug: string;
  isoCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * ===== Movies =====
 */
export type MovieKind = "movie" | "series" | "hoathinh" | "phimle" | "phimbo";
export type MovieStatus = "ongoing" | "completed" | "upcoming";

export type TMDBInfo = {
  id?: string;
  type?: string;
  voteAverage?: number;
  voteCount?: number;
};

export type IMDBInfo = {
  id?: string;
  voteAverage?: number;
  voteCount?: number;
};

export type Breadcrumb = {
  name: string;
  slug?: string;
  position?: number;
  isCurrent?: boolean;
};

export type MovieType = {
  _id?: string;
  slug: string;
  name: string;
  originName?: string;
  alternativeNames?: string[];
  description?: string;
  content?: string;
  type: MovieKind;
  status?: MovieStatus;
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
  tmdb?: TMDBInfo;
  imdb?: IMDBInfo;
  episodeCount?: number;
  latestEpisode?: string;
  seo?: Record<string, any>;
  breadcrumbs?: Breadcrumb[];
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * ===== Episodes =====
 */
export type EpisodeData = {
  name: string;
  slug?: string;
  filename?: string;
  linkEmbed?: string;
  linkM3u8?: string;
  duration?: string;
  releaseDate?: Date | string;
};

export type EpisodeType = {
  id?: string;
  movieId: string;
  serverName: string;
  isAI?: boolean;
  priority?: number;
  serverData: EpisodeData[];
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * ===== Users =====
 */
export type UserWatched = {
  movieId: string;
  episode?: string;
  progress?: number;
  updatedAt?: Date;
};

export type UserType = {
  id?: string;
  username: string;
  email: string;
  passwordHash: string;
  role?: "user" | "admin" | "moderator";
  favorites?: string[];
  watched?: UserWatched[];
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * ===== Comments =====
 */
export type CommentType = {
  id?: string;
  movieId: string;
  userId?: string;
  content: string;
  parentId?: string | null;
  likes?: number;
  dislikes?: number;
  meta?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
};

/**
 * ===== Views =====
 */
export type ViewType = {
  id?: string;
  movieId: string;
  userId?: string | null;
  ip?: string;
  userAgent?: string;
  referer?: string;
  createdAt?: Date;
};
