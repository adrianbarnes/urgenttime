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

    await createSession(user.id, user.email)
    redirect('/call')    
  }
  