import { Schema, model, Document } from "mongoose";

export interface IMedia extends Document {
  title: string;
  description: string;
  tags: string[];
  category:
    | "UI/UX"
    | "Blockchain Development"
    | "Web Development"
    | "2D/3D design"
    | "Game Development"
    | "App Development";
  images: string[];
  problem: string;
  solution: string;
}

const mediaSchema = new Schema<IMedia>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: [String], required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "UI/UX",
        "Blockchain Development",
        "Web Development",
        "2D/3D design",
        "Game Development",
        "App Development",
      ],
    },
    images: { type: [String], required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IMedia>("Media", mediaSchema);
