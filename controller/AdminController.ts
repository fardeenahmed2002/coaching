import Question from "@/model/QuestionModel"
import { NextResponse } from "next/server"

export const addquestion = async (question: string, options: string[], correct: string) => {
    try {
        const newquestion = new Question({
            question, options, correct
        })
        await newquestion.save()
        console.log(newquestion)
        return NextResponse.json({
            success: true,
            message: "question added",
            qus: newquestion
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}