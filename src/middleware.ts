export { default } from "next-auth/middleware"

import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import nextauthConfig from "@/app/config/nextauth";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: nextauthConfig.nextAuthSecret });

  const { pathname } = req.nextUrl;

  // Redirect authenticated users from login or register pages to the homepage
  if (token && (pathname === '/auth' || pathname === '/auth/register')) {
    return NextResponse.redirect(new URL('/calls', req.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ["/calls", '/auth', '/auth/register'] }