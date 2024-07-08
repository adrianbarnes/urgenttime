import appConfig from '@/app/config/app';

export const generateRandomString = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  export const generateInviteLink = (meetingLink: string) =>{
    let baseUrl = appConfig.appUrl;
    let link =  baseUrl + "/calls";

    link+= `/${meetingLink}/join`;


    return link;
  }