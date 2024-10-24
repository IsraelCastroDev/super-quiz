import mongoose, { Document, Schema, Types } from "mongoose";

export type QuizCategoryType = Document & {
  quiz: Types.ObjectId;
  category: Types.ObjectId;
};

const QuizCategorySchema: Schema = new Schema(
  {
    quiz: { type: Types.ObjectId, ref: "Quiz", required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
  },
  { timestamps: true }
);

QuizCategorySchema.index({ quiz: 1, category: 1 }, { unique: true });

const QuizCategory = mongoose.model<QuizCategoryType>(
  "QuizCategory",
  QuizCategorySchema
);
export default QuizCategory;
