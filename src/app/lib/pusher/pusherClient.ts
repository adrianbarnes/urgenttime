import PusherClient from "pusher-js"

// Allows you to use Pusher inside Next.js "use client" components.
export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  //authEndpoint: "/api/pusher-auth", // OPTIONAL: For secure web sockets.
  //authTransport: "ajax",
//   auth: {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   },
})