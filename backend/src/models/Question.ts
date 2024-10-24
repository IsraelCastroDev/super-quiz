import mongoose, { Document, Model, Schema, Types } from "mongoose";
import Answer from "./Answer";
import Token from "./Token";

export type QuestionType = Document & {
  title: string;
  answers: Types.ObjectId[];
  quiz: Types.ObjectId;
};

const QuestionSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    answers: [{ type: Types.ObjectId, ref: "Answer" }],
    quiz: { type: Types.ObjectId, ref: "Quiz", required: true },
  },
  { timestamps: true }
);

const Question = mongoose.model<QuestionType>("Question", QuestionSchema);
export default Question;
