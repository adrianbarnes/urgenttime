'use server'

import { FormState, LaunchCallFormSchema} from "../lib/definitions";
import { sendMail } from "../lib/emailer";
import { render } from "@react-email/components";
import InviteEmail from "../emails/invite";
import { generateInviteLink, generateRandomString } from "../lib/utils";
import { getUser } from "../lib/dal";
import Call from "@/models/call";
import { CallStatus } from "@/enum/callStatus";

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

    const meetLink = generateRandomString(10);

    const inviteLink = generateInviteLink(meetLink);
    const user = await getUser();
    const username = user?.username as string;


    const html = render(<InviteEmail userName={username} inviteLink={inviteLink}/>,
    {
        pretty: true,
    })

    try {
        await sendMail('from', email, 'Invitation to Join Call', html, "");

        const timeStamp = new Date().toISOString();

        const call: Call = {
          meetingId: meetLink,
          userId: user?.id as string,
          email: email,
          status: CallStatus.LINK_SENT,
          createdAt: timeStamp,
          updatedAt: timeStamp,
        };
        
        return { success: 'Mail sent successfully', inviteLink: inviteLink, call: call };
      } catch (error) {
        return { error: 'Failed to send mail' };
      }
   
     
  }
  