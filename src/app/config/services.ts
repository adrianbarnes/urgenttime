const servicesConfig = {
    googleSecret: process.env.GOOGLE_SECRET as string,
    googleId: process.env.GOOGLE_ID as string,
    pusherKey: process.env.NEXT_PUBLIC_PUSHER_KEY as string,
    pusherCluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
    pusherAppId: process.env.PUSHER_APP_ID as string,
    pusherSecret: process.env.PUSHER_SECRET as string,
};

export default servicesConfig;