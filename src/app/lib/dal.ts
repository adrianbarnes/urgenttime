import 'server-only'
 
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import User from '@/models/user'
 
export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/auth')
  }
 
  return { isAuth: true, userId: session.userId, username: session.username  }
})

export interface SessionPayload {
  // Define the properties and their types required for the SessionPayload
  userId: string;
  username: string;
  [key: string]: string | number;

}

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null
    const user : User = {
      id: session.userId as string,
      username: session.username as string,
      email: session.username as string,
    }
    return user;
    // try {
    //   const data = await db.query.users.findMany({
    //     where: eq(users.id, session.userId),
    //     // Explicitly return the columns you need rather than the whole user object
    //     columns: {
    //       id: true,
    //       firstname: true,
    //       lastname: true,
    //       email: true,
    //     },
    //   })
   
    //   const user = data[0]
   
    //   return user
    // } catch (error) {
    //   console.log('Failed to fetch user')
    //   return null
    // }
  })