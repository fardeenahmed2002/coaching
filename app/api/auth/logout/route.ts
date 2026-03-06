import { logout } from "@/controller/AuthController";
import { NextResponse } from "next/server";

export const POST = async (): Promise<NextResponse> => {
    try {
        return logout()
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `server error`,
            error: (error as Error).message
        }, { status: 500 })
    }
}