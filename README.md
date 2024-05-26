
# Next.js Application Deployment Guide

This guide will walk you through setting up and deploying the UrgentTime application on a local machine or other environments. Make sure you have the necessary environment variables configured correctly.

## Prerequisites

Before you begin, ensure you have the following software installed on your system:  

- [Node.js](https://nodejs.org/en/) (version 14.x or higher)

- [npm](https://www.npmjs.com/) (usually comes with Node.js)

- [Git](https://git-scm.com/)  

## Getting Started

1.  **Clone the repository:**

```bash
git  clone  https://github.com/adrianbarnes/urgenttime.git
cd  urgenttime
```

2.  **Install dependencies:**

```bash
npm  install
```

3.  **Create a `.env.local` file in the root of your project and add the following environment variables:**

```env
APP_URL=http://localhost:3000
SESSION_SECRET=your_secret_key
GOOGLE_SECRET=your_google_secret
GOOGLE_ID=your_google_id  
MAIL_HOST=smt.local.test
MAIL_PORT=567
MAIL_FROM_ADDRESS=hello@urgentime.test
MAIL_USERNAME=null
MAIL_PASSWORD=null
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=your_pusher_cluster
PUSHER_APP_ID=your_pusher_app_id
PUSHER_SECRET=your_pusher_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

```
Replace the variables with the actual values for your environment
  
4.  **Run the development server:**

```bash
npm  run  dev  
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables
-  **APP_URL**: The base URL of your application.
-  **SESSION_SECRET**: A secret key for session management.
-  **GOOGLE_SECRET**: Your Google API secret for SSO.
-  **GOOGLE_ID**: Your Google API ID for SSO.
-  **MAIL_HOST**: The mail server host.
-  **MAIL_PORT**: The mail server port.
-  **MAIL_FROM_ADDRESS**: The email address from which mails will be sent.
-  **MAIL_USERNAME**: The mail server username (use `null` if not applicable).
-  **MAIL_PASSWORD**: The mail server password (use `null` if not applicable).
-  **NEXT_PUBLIC_PUSHER_KEY**: Pusher public key.
-  **NEXT_PUBLIC_PUSHER_CLUSTER**: Pusher cluster.
-  **PUSHER_APP_ID**: Pusher app ID.
-  **PUSHER_SECRET**: Pusher secret.
-  **NEXTAUTH_URL**: NextAuth app url.
-  **NEXTAUTH_SECRET**: NextAuth secret. You can generate using https://generate-secret.vercel.app/32

## Deployment
To deploy your application, you can use platforms like Vercel, Heroku, or any other cloud service provider that supports Node.js applications.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
  
If you encounter any issues or have questions, feel free to reach out to the team for support. Happy coding!
