import mongoose, { Document, Schema, Types } from "mongoose";

export type AnswerType = Document & {
  title: string;
  is_correct: boolean;
  question: Types.ObjectId;
};

export const AnswerSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  is_correct: { type: Boolean, required: true, trim: true },
  question: { type: Types.ObjectId, ref: "Question", required: true },
});

const Answer = mongoose.model<AnswerType>("Answer", AnswerSchema);
export default Answer;
