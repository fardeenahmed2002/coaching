import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET)
        const { payload } = await jwtVerify(token, secret)
        const { pathname } = request.nextUrl
        if (pathname.startsWith('/student')) {
            if (payload.role==='student') {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(new URL('/', request.url))
            }
        }
        if (pathname.startsWith('/admin')) {
            if (payload.role==='admin') {
                return NextResponse.next()
            } else {
                return NextResponse.redirect(new URL('/', request.url))
            }
        }
        
    } catch (err) {
        console.error('Invalid token', (err as Error).message)
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        '/student/:path*', '/admin/:path*'
    ],
}
