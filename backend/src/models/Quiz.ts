import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import Question from "./Question";
import Token from "./Token";

export type QuizType = Document & {
  title: string;
  score?: number;
  created_at: Date;
  user: Types.ObjectId;
  questions: PopulatedDoc<QuizType & Document>[];
  token?: string;
};

const QuizSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    score: { type: Number, required: true, trim: true },
    token: { type: String, trim: true },
    user: { type: Types.ObjectId, ref: "User" },
    questions: [{ type: Types.ObjectId, ref: "Question" }],
  },
  { timestamps: true }
);

QuizSchema.pre("findOneAndDelete", async function (next) {
  const quizId = this.getQuery()["_id"];
  console.log(quizId);

  try {
    await Question.deleteMany({ quiz: quizId });
    await Token.deleteMany({ quiz: quizId });
    next();
  } catch (error) {
    console.log(error);
    next(error as Error);
  }
});

const Quiz = mongoose.model<QuizType>("Quiz", QuizSchema);
export default Quiz;
