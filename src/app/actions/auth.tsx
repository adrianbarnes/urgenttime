'use server'

import { redirect } from "next/navigation";
import { FormState, LoginFormSchema } from "../lib/definitions";
import { createSession } from "../lib/session";

export async function login(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = LoginFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
   
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }
   
    const { email, password } = validatedFields.data

    const user = {
        id: "1234",
        email,
        password

    }

    await createSession(user.id)
    redirect('/call')    
  }
  