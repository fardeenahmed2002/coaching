import { Schema, model, models } from "mongoose";

interface IQuestion {
  question: string;
  options: string[];
  correct: string;
}

const questionSchema = new Schema<IQuestion>(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correct: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Model name should match purpose
const Question = models.Question || model<IQuestion>("Question", questionSchema);

export default Question;