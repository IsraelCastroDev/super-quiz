import mongoose, { Document, Schema, Types } from "mongoose";

export type QuizCategoryType = Document & {
  state: string;
  created_at: Date;
  quiz: Types.ObjectId;
  category: Types.ObjectId;
};

const QuizCategorySchema: Schema = new Schema(
  {
    state: { type: String, required: true, trim: true },
    created_at: { type: Date, required: true, trim: true },
    quiz: { type: Types.ObjectId, ref: "Quiz" },
    category: { type: Types.ObjectId, ref: "Category" },
  },
  { timestamps: true }
);

const QuizCategory = mongoose.model<QuizCategoryType>(
  "QuizCategory",
  QuizCategorySchema
);
export default QuizCategory;
