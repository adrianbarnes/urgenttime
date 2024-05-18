'use server'

import { redirect } from "next/navigation";
import { FormState, SignupFormSchema } from "../lib/definitions";
import { createSession } from "../lib/session";

export async function signup(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
    })
   
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }
   
    const { firstName, lastName, email, password } = validatedFields.data

    const user = {
        id: "1234",
        firstName,
        lastName,
        email,
        password

    }
   
    //3. Insert the user into the database or call an Auth Library's API
    // const data = await db
    //   .insert(users)
    //   .values({
    //     firstName,
    //     lastName,
    //     email,
    //   })
    //   .returning({ id: users.id })
   
    // const user = data[0]
   
    // if (!user) {
    //   return {
    //     message: 'An error occurred while creating your account.',
    //   }
    // }

    await createSession(user.id)
    redirect('/call')    
  }
  