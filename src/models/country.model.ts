import mongoose, { Schema, Document } from "mongoose";
export interface ICountry extends Document {
  name: string;
  slug: string;
  isoCode?: string;
}

const CountrySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    isoCode: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ICountry>("Country", CountrySchema);
