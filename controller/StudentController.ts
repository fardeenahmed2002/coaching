import Question from "@/model/QuestionModel"
import Result from "@/model/ResultModel"
import User from "@/model/UserModel"
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


export const checkanswers = async (
    answers: Record<string, string>,
    id: string,
    subject: string,
    studentClass: number
) => {
    try {

        let result = 0
        const ansArray = Object.entries(answers)

        for (const [questionId, answer] of ansArray) {

            const question = await Question.findById(questionId)

            if (question && question.correct === answer) {
                result++
            }

        }
        console.log(result)
        const studentResult = new Result({
            studentId: id,
            subject,
            studentClass,
            result,
            outOf: ansArray.length
        })

        await studentResult.save()

        return NextResponse.json({
            success: true,
            message: "Result saved"
        })

    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }
}

export const getResults = async (userid: string) => {

    try {
        const getstudent = await User.findById(userid)
        if (!getstudent) {
            return NextResponse.json({
                success: false,
                message: "no such student"
            })
        }

        const getmarks = await Result.findOne({ studentId: userid })
        if (!getmarks) {
            return NextResponse.json({
                success: false,
                message: "no result found"
            })
        }
        return NextResponse.json({
            success: true,
            message: "result found",
            getmarks
        })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }
}