import servicesConfig from "@/app/config/services"
import PusherClient from "pusher-js"

// Allows you to use Pusher inside Next.js "use client" components.
export const pusherClient = new PusherClient(servicesConfig.pusherKey, {
  cluster: servicesConfig.pusherCluster,
  //authEndpoint: "/api/pusher-auth", // OPTIONAL: For secure web sockets.
  //authTransport: "ajax",
//   auth: {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   },
})