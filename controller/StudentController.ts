import Question from "@/model/QuestionModel"
import { NextResponse } from "next/server"

export const getquestions = async () => {
    try {
        const questions = await Question.find()
        return NextResponse.json({
            success: true,
            message: 'questions got',
            questions
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}