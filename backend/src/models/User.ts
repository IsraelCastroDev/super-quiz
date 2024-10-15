import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import Quiz from "./Question";

export type UserType = Document & {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  confirm: boolean;
  quizzes: Types.ObjectId[];
  tokens: Types.ObjectId[];
  role: Types.ObjectId[];
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

UserSchema.pre("findOneAndDelete", async function (next) {
  const userId = this.getQuery()["_id"]; // Obtiene el ID del usuario que se está eliminando

  try {
    const quizzes = await Quiz.find({ user: userId });
    await Promise.all(quizzes.map((quiz) => quiz.deleteOne()));
    next();
  } catch (error) {
    console.log(error);
    next(error as Error);
  }
});

const User = mongoose.model<UserType>("User", UserSchema);
export default User;
