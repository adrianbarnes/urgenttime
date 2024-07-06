

import { authConfig } from "@/app/actions/auth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";

// const handler = NextAuth(authConfig);

// export { handler as GET, handler as POST };

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return NextAuth(req, res, authConfig);
  }