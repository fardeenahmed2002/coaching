
import { getUserData } from "@/controller/UserController"
import connectToDb from "@/lib/DbConnection"
import { userAuth } from "@/middleware/userAuth"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        await connectToDb()
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: "user is not authorized"
            })
        }
        return await getUserData(auth.userid)

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'server error',
            error: (error as Error).message
        }, { status: 500 })
    }
}