import { signup } from "@/controller/AuthController"
import connectToDb from "@/lib/DbConnection"
import { NextRequest, NextResponse } from "next/server"
import { userAuth } from "@/middleware/userAuth"
import { isLoggedIn } from "@/controller/AuthController"

export const POST = async (req: Request): Promise<NextResponse> => {
    try {
        await connectToDb()
        const formData = await req.formData()
        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const studentClass = Number(formData.get('studentClass'))
        const role = formData.get('role') as string
        const result = signup(name, email, password, studentClass, role)
        return result
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "server error",
            error: (error as Error).message
        }, { status: 500 })
    }
}

export const GET = async (req: NextRequest): Promise<NextResponse> => {
    try {
        const auth = await userAuth(req)
        if (!auth.authorized) {
            return NextResponse.json({
                success: false,
                message: 'not authed'
            }, { status: 401 })
        }
        return isLoggedIn(req)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: 'server error'
        }, { status: 500 })
    }
}