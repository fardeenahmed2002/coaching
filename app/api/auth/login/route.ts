import { login } from "@/controller/AuthController";
import connectToDb from "@/lib/DbConnection";
import { NextResponse } from "next/server";

export const POST = async (req: Request): Promise<NextResponse> => {
    try {
        await connectToDb()
        const { email, password } = await req.json()
        return login(email, password)
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "server error",
            error: (error as Error).message
        }, { status: 500 })
    }
}