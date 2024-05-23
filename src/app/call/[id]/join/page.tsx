'use client'

import PeerPage from '@/app/components/video/peer';
import VideoCall from '@/app/components/video/videocall';
import { useSearchParams } from 'next/navigation';

export default function JoinPage({ params }: { params: { id: string } }) {

  const searchParams = useSearchParams()
 
  const isCaller = searchParams.get('is_caller') === 'true';

  return (
    
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="container mx-auto mt-14">
        <div className="flex w-full ">
          <div className="w-3/5 bg-white">

              <VideoCall roomId={params.id} isCaller={isCaller}/>
          </div>
          <div className="w-2/5 bg-dark-blue"></div>
        </div>
      </div>
    </main>
  );
}
