import mongoose, {
  Document,
  Model,
  PopulatedDoc,
  Schema,
  Types,
} from "mongoose";
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

QuestionSchema.pre("findOneAndDelete", async function (next) {
  const questionId = this.getQuery()["_id"]; // Asegúrate de que esto sea el ID de la pregunta
  console.log(questionId);

  try {
    // Usa this.constructor para obtener el modelo correctamente
    const question = await (this.constructor as Model<QuestionType>)
      .findById(questionId)
      .populate("quiz");
    const quizId = question?.quiz;

    if (quizId) {
      await Answer.deleteMany({ question: quizId }); // Elimina respuestas asociadas
      await Token.deleteMany({ quiz: quizId }); // Elimina tokens asociados
    }

    next(); // Llama a next() para continuar
  } catch (error) {
    console.log(error);
    next(error as Error);
  }
});

const Question = mongoose.model<QuestionType>("Question", QuestionSchema);
export default Question;
