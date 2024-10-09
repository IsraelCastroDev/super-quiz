import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";

export type QuizType = Document & {
  title: string;
  score?: number;
  created_at: Date;
  user: Types.ObjectId;
  questions: PopulatedDoc<QuizType & Document>[];
};

const QuizSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    score: { type: Number, required: true, trim: true },
    user: { type: Types.ObjectId, ref: "User" },
    questions: [{ type: Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

const Quiz = mongoose.model<QuizType>("Quiz", QuizSchema);
export default Quiz;
