import { addquestion } from "@/controller/AdminController"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {
        const { question, options, correct } = await req.json()
        console.log(question, options, correct)
        if (!question || !options || options.length !== 4 || !correct) {
            return new Response(JSON.stringify({ success: false, message: "Invalid data" }), { status: 400 });
        }
        return addquestion(question, options, correct)
    } catch (error: any) {
        console.error(error.message)
        return NextResponse.json({
            success: false,
            message: error.message
        })
    }
}