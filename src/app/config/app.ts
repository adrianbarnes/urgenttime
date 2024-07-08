const appConfig = {
    //appName: process.env.NEXT_PUBLIC_APP_NAME,
    appUrl: process.env.APP_URL ?? "http://localhost:3000",
    mailHost: process.env.MAIL_HOST,
    mailPort: parseInt(process.env.MAIL_PORT as string),
    mailFromAddress: process.env.MAIL_FROM_ADDRESS,
    mailUsername: process.env.MAIL_USERNAME,
    mailPassword: process.env.MAIL_PASSWORD,
    localStorageDatabaseName: process.env.NEXT_PUBLIC_LOCAL_STORAGE_DATABASE_NAME as string,
};

export default appConfig;