import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";

export type QuizType = Document & {
  title: string;
  score?: number;
  user: Types.ObjectId;
  questions: Types.ObjectId[];
  duration: number;
  token: string;
};

export const QuizSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  score: { type: Number, default: 0 },
  user: { type: Types.ObjectId, ref: "User", required: true },
  questions: [{ type: Types.ObjectId, ref: "Question" }],
  duration: { type: Number, required: true, default: 15 },
  token: { type: String, trim: true, required: true },
});

const Quiz = mongoose.model<QuizType>("Quiz", QuizSchema);
export default Quiz;
