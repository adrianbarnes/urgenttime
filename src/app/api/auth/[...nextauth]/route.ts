import { authConfig } from "@/app/actions/auth";
import NextAuth from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";

//const handler = NextAuth(authConfig);

// export { handler as GET, handler as POST };

import type { NextApiRequest, NextApiResponse } from "next"



export async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`

  const resq = NextResponse.next();
  resq.headers.set('Cache-Control', 'no-store, max-age=0');


  return await NextAuth(req, res, authConfig)
}


export { auth as GET, auth as POST };