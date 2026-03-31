import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILoveLetter extends Document {
  title: string;
  body: string;
  createdAt: Date;
}

const LoveLetterSchema = new Schema<ILoveLetter>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    body: {
      type: String,
      required: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

export const LoveLetter: Model<ILoveLetter> =
  mongoose.models.LoveLetter ||
  mongoose.model<ILoveLetter>("LoveLetter", LoveLetterSchema);

