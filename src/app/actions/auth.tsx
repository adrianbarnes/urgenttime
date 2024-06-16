'use server'

import { redirect } from "next/navigation";
import { FormState, LoginFormSchema } from "@/app/lib/definitions";
import { createSession } from "@/app/lib/session";
import { generateRandomString } from "@/app/lib/utils";

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
   
    const { email, password } = validatedFields.data;

    const id = generateRandomString(11);

    const user = {
        id: id,
        email,
        password

    }

    await createSession(user.id, user.email)
    redirect('/calls')    
  }
  