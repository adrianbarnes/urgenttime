import servicesConfig from "@/app/config/services"
import PusherServer from "pusher"

// Allows you to use pusher inside Next.js route handlers and server
// components.
export const pusherServer = new PusherServer({
  appId: servicesConfig.pusherAppId,
  key: servicesConfig.pusherKey,
  secret: servicesConfig.pusherSecret,
  cluster: servicesConfig.pusherCluster,
  useTLS: true,
})