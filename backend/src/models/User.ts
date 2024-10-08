import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { QuizType } from "./Quiz";
import { TokenType } from "./Token";

export type UserType = Document & {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirm: boolean;
  quizzes: PopulatedDoc<QuizType & Document>[];
  tokens: PopulatedDoc<TokenType & Document>[];
  role: Types.ObjectId;
};

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    confirm: { type: Boolean, required: true, default: false },
    quizzes: [
      {
        type: Types.ObjectId,
        ref: "Quiz",
      },
    ],
    tokens: [
      {
        type: Types.ObjectId,
        ref: "Token",
      },
    ],
    role: [
      {
        type: Types.ObjectId,
        ref: "Role",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model<UserType>("User", UserSchema);
export default User;
