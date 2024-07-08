import { Tailwind,Html, Head, Body, Section, Button, Img } from '@react-email/components';
import * as React from 'react';
import appConfig from '@/app/config/app';

type EmailProps = {
  inviteLink: string,
  userName: string
}

const InviteEmail = (props: EmailProps) => {
  const {
    inviteLink = props.inviteLink,
    userName = props.inviteLink,
  } = props

  const brandImageUrl = appConfig.appUrl + "/logo.png";

  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              "dark-blue": "rgba(36, 71, 122, 1)",
            },
          },
        },
      }}
    >
    <Html lang="en" dir="ltr">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Invitation to join call</title>
      </Head>
      <Body className="bg-white-700 my-auto mx-auto font-sans">
      <div className="ml-8 p-4">
          <div className="flex items-center">

            <a href="#">
              <Img src={`${brandImageUrl}`} alt="Urgenttime Logo"
                className="h-8 mr-4"
                width={163}
                height={31}
              />
            </a>
          </div>
        </div>

        <Section className='mt-8 text-black'>

          <p>{userName} has invited you to join the meeting. Click the button below to join:</p>
          <Button href={`${inviteLink}`} className="bg-dark-blue px-3 py-2 font-medium leading-4 text-white">
          Join Meeting
        </Button>

        <p>or copy and paste the link below in your browser to join:</p>
        <a className="text-primary-600 text-dark-blue underline hover:underline" href={`${inviteLink}`}>{inviteLink}</a>
        </Section>

        <p>Kind Regards,<br/>
        Urgenttime Team</p>
      </Body>
    </Html>
    </Tailwind>
  )
}

export default InviteEmail