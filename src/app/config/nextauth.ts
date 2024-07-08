const nextauthConfig = {
    nextAuthUrl: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    nextAuthSecret: process.env.NEXTAUTH_SECRET,
};

export default nextauthConfig;