'use client'

import ConnectionTab from '@/app/components/video/connectionTab';
import VideoCall from '@/app/components/video/videocall';
import { useSearchParams } from 'next/navigation';

export default function JoinPage({ params }: { params: { id: string } }) {

  const searchParams = useSearchParams()
 
  const isCaller = searchParams.get('is_caller') === 'true';

  return (
    
  <main className="flex min-h-screen flex-col items-center justify-between">
    <div className="container mx-auto mt-14">
      <div className="flex flex-col-reverse md:flex-row w-full ">
        <div className="w-full md:w-3/5 bg-black rounded-l-lg">
          <VideoCall meetingId={params.id} isCaller={isCaller}/>
        </div>
        <div className="w-full md:w-2/5 bg-white rounded-r-lg">
          <div className='w-3/5 mx-auto'>
            <ConnectionTab/>
          </div>
        </div>
      </div>
    </div>
  </main>

  );
}
