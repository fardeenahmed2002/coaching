import { Schema, model, models } from "mongoose";

interface IResult {
  studentId: string;
  subject: string;
  studentClass: string;
  result: number;
  outOf:number
}

const resultSchema = new Schema<IResult>(
  {
    studentId: { type: String, required: true },
    subject: { type: String, required: true },
    studentClass:{type:String, required:true},
    result: { type: Number, required: true },
    outOf: { type: Number, required: true },
  },{timestamps: true}
);


const Result = models.Result || model<IResult>("Result", resultSchema);

export default Result;