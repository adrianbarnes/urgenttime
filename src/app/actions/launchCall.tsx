'use server'

import { FormState, LaunchCallFormSchema} from "@/app/lib/definitions";
import { sendMail } from "@/app/lib/emailer";
import { render } from "@react-email/components";
import InviteEmail from "@/app/emails/invite";
import { generateInviteLink, generateRandomString } from "@/app/lib/utils";
import Call from "@/models/call";
import { CallStatus } from "@/enum/callStatus";
import { getSession } from "@/app/actions/auth";

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

    const session = await getSession();

    const user = session?.user;

    const senderEmail = user?.email as string;

    const userId =  user?.id as string;

    const inviteLink = generateInviteLink(meetLink);

    const html = await render(<InviteEmail userName={senderEmail} inviteLink={inviteLink}/>,
    {
        pretty: true,
    })

    try {
        await sendMail('from', email, 'Invitation to Join Call', html, "");

        const timeStamp = new Date().toISOString();

        const call: Call = {
          meetingId: meetLink,
          userId: userId,
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
  