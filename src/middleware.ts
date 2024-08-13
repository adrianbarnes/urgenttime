export { default } from "next-auth/middleware"

import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import nextauthConfig from "@/app/config/nextauth";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: nextauthConfig.nextAuthSecret });

  const { pathname } = req.nextUrl;

  // Redirect authenticated users from login or register pages to the homepage
  if (token && (pathname === '/auth' || pathname === '/auth/register')) {
    return NextResponse.redirect(new URL('/calls', req.url));
  }  


  if (token) {
    return NextResponse.next();
  }  

  if ( (pathname === '/auth' || pathname === '/auth/register')) {
    return NextResponse.next();
  }  

  // Check if the pathname matches the pattern
  if (pathname.match(/^\/calls\/[a-zA-Z0-9]+\/join$/)) {
    return NextResponse.next();
  }   

  // Check if the pathname matches the pattern
  if (pathname.match(/\.svg$/)) {
    return NextResponse.next();
  }   


  return NextResponse.redirect(new URL('/auth', req.url));
}