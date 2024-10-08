import mongoose, { Document, Schema, Types } from "mongoose";

export type QuestionType = Document & {
  name: string;
  is_correct: boolean;
  quiz: Types.ObjectId;
};

const QuestionSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  is_correct: { type: Boolean, required: true, trim: true },
  quiz: { type: Types.ObjectId, ref: "Quiz" },
});

const Question = mongoose.model<QuestionType>("Question", QuestionSchema);
export default Question;
