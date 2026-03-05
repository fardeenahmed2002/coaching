import connectToDb from "@/lib/DbConnection";
import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
    try {
        await connectToDb();

        return NextResponse.json({
            message: "connected",
            success: true,
        });
    } catch (error) {
        return NextResponse.json({
            message: "error in connect db",
            error: (error as Error).message,
        });
    }
};