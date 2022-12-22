// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import authService from './src/services/auth.service'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

  console.log('accesstoken: ', process.env.JWT_ACCESS_TOKEN_COOKIE_NAME)
  console.log('cookie >>', request.cookies.get(process.env.JWT_ACCESS_TOKEN_COOKIE_NAME!))

  if (request.nextUrl.pathname.startsWith('/user')) {
    const atCookie = request.cookies.get(process.env.JWT_ACCESS_TOKEN_COOKIE_NAME || "");
    console.log({ atCookie })
    try {
      await authService.authenticate(`${atCookie?.name}=${atCookie?.value}`)
    } catch (error: any) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }
  if (request.nextUrl.pathname.startsWith('/auth')) {
    const atCookie = request.cookies.get(process.env.JWT_ACCESS_TOKEN_COOKIE_NAME || "");
    console.log({ atCookie })
    try {
      await authService.authenticate(`${atCookie?.name}=${atCookie?.value}`)
      return NextResponse.redirect(new URL('/', request.url))
    } catch (error: any) {
      return NextResponse.next()
    }
  }

}