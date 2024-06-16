import { CallStatus } from "@/enum/callStatus";

interface Call {
    id?: string;
    meetingId: string;
    phoneNumber?: string;
    email?: string;
    userId: string;
    status?: CallStatus;
    startedAt?: string;
    endedAt?: string;
    createdAt: string;
    updatedAt: string;

  }
  
  export default Call;