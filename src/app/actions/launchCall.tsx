'use server'

import { redirect } from "next/navigation";
import { FormState, LaunchCallFormSchema} from "../lib/definitions";
import { sendMail } from "../lib/emailer";
import { render } from "@react-email/components";
import InviteEmail from "../emails/invite";
import { generateInviteLink } from "../lib/utils";
import { getUser } from "../lib/dal";

export async function launchCall(state: FormState, formData: FormData) {
    // Validate form fields
    const validatedFields = LaunchCallFormSchema.safeParse({
      email: formData.get('email'),
      //phoneNumber: formData.get('number'),
    })
   
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }


    const { email} = validatedFields.data;

    const inviteLink = generateInviteLink();
    const user = await getUser();
    const username = user?.username as string;

    const html = render(<InviteEmail userName={username} inviteLink={inviteLink}/>,
    {
        pretty: true,
    })

    sendMail('from', email, 'Invitation to Join Call', html, "");
   

    //redirect('/call')    
  }
  