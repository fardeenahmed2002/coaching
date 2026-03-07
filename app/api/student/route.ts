import { getquestions } from "@/controller/StudentController"
import { NextResponse } from "next/server"

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