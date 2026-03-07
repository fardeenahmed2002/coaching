import { checkanswers, getquestions } from "@/controller/StudentController"
import connectToDb from "@/lib/DbConnection"
import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
    try {
        return getquestions()
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}


export const POST = async (req: NextRequest) => {
    try {
        await connectToDb()
        const { answers, id, subject, studentClass } = await req.json()
        console.log(answers, id)
        return checkanswers(answers, id, subject, studentClass)
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}