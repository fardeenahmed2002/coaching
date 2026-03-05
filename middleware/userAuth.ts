
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
type AuthResult = | { authorized: true; userid: string } | { authorized: false; error: string }
export const userAuth = async (req: NextRequest): Promise<AuthResult> => {
    const token = req.cookies.get('token')?.value

    if (!token) {
        return {
            authorized: false,
            error: 'Not authorized, login again',
        }
    }

    try {
        if (!process.env.JWT_SECRET) {
            return {
                authorized: false,
                error: "JWT_SECRET env missing"
            }
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
        return {
            authorized: true,
            userid: decoded.id,
        }
    } catch (error) {
        console.log((error as Error).message)
        return {
            authorized: false,
            error: 'Invalid or expired token',
        }
    }
}
