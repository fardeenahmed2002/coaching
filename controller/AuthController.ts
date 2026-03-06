import User from "@/model/UserModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
export const signup = async (
    name: string,
    email: string,
    password: string,
    studentClass: number,
    role: string
): Promise<NextResponse> => {
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({
                success: false,
                message: 'user already exist'
            }, { status: 409 })
        }
        if (password.length < 6) {
            return NextResponse.json({
                success: false,
                message: "Password must be at least 6 characters"
            }, { status: 400 })
        }

        const hashedpassword = await bcrypt.hash(password, 10)
        const user = new User({
            name, email, password: hashedpassword, studentClass, role
        })
        await user.save()
        const secret = process.env.JWT_SECRET
        if (!secret) {
            throw new Error("JWT_SECRET not defined in environment variables")
        }
        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, secret, { expiresIn: "7d" })
        const response = NextResponse.json({
            message: `Registration successfull`,
            success: true,
            user,
            token
        })
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        });
        return response
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "server error",
            error: (error as Error).message
        }, { status: 500 })
    }
}

export const login = async (email: string, password: string): Promise<NextResponse> => {
    try {


        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "no user found"
            }, { status: 404 })
        }
        const valiedPassword = await bcrypt.compare(password, user.password)
        if (!valiedPassword) {
            return NextResponse.json({
                success: false,
                message: "Invalied password"
            }, { status: 404 })
        }

        const token = jwt.sign({
            id: user._id,
            role: user.role,
        }, process.env.JWT_SECRET!,
            { expiresIn: `7d` }
        )
        const response = NextResponse.json({
            message: `Login successful`,
            success: true,
            user,
            token
        })
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        })
        return response
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "server error",
            error: (error as Error).message
        }, { status: 500 })
    }
}

export const isLoggedIn = async (req: NextRequest): Promise<NextResponse> => {
    try {
        return NextResponse.json({
            success: true,
            message: "account authenticated"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'server error',
            error: (error as Error).message
        }, { status: 500 })
    }
}


export const logout = async (): Promise<NextResponse> => {
    try {
        const response = NextResponse.json({
            success: true,
            message: "Logout successful",
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60,
            path: "/",
        })
        return response
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`,
            error: (error as Error).message
        }, { status: 500 })
    }
}