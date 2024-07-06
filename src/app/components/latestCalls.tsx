import React, { FC } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import {db} from "@/app/lib/dexieDB";
import moment from 'moment';
import Call from "@/models/call";

const CallHistory: FC = () => {

  // dexie hook to get live data 
  const callList = useLiveQuery(() => db.call.reverse().limit(10).toArray());

  const formatDateTime = (datetime: moment.Moment) => {

    const today = moment().startOf('day');
    const yesterday = moment().subtract(1, 'days').startOf('day');
  
    if (datetime.isSame(today, 'd')) {
      return `Today ${datetime.format('h:mma')}`;
    } else if (datetime.isSame(yesterday, 'd')) {
      return `Yesterday ${datetime.format('h:mma')}`;
    } else if (datetime.isSame(moment(), 'week')) {
      return datetime.format('dddd h:mma');
    } else {
      return datetime.format('MM/DD/YYYY h:mma');
    }

  };    

  const LatestCalls = () => {
    
    return callList && callList.length > 0 ?  (
      <div className="overflow-x-auto w-full p-4 mx-auto bg-white pb-8 rounded-2xl shadow-lg shadow-black-500/50">
        <table className="table-auto border-collapse text-gray-500 min-w-full">
          <thead className="text-left">
            <tr>
              <th className="text-dark-blue text-md p-2">Meeting Link</th>
              <th className="text-dark-blue text-md p-2">Recipient</th>
              <th className="text-dark-blue text-md p-2">Started At</th>
              <th className="text-dark-blue text-md p-2">Ended At</th>
              <th className="text-dark-blue text-md p-2">Duration</th>
              <th className="text-dark-blue text-md p-2">Status</th>
            </tr>
          </thead>
          <tbody>
          {
            callList?.map((i: Call, index: number) => {

              let duration = null;

              if (i.startedAt && i.endedAt) {
                const startedAt = new Date(i.startedAt);
                const endedAt = new Date(i.endedAt);
                const durationInSeconds = (endedAt.getTime() - startedAt.getTime()) / 1000;
          
                const hours = Math.floor(durationInSeconds / 3600);
                const minutes = Math.floor((durationInSeconds % 3600) / 60);
                const seconds = Math.round(durationInSeconds % 60);
          
                if (hours > 0) {
                  duration = `${hours}h ${minutes}min ${seconds}s`;
                } else if (minutes > 0) {
                  duration = `${minutes}min ${seconds}s`;
                } else {
                  duration = `${seconds}s`;
                }
              }
              return (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className={`text-sm ${i.meetingId ? 'p-2' : 'p-0'}`}><span>{i.meetingId}</span></td>
                    <td className={`text-sm ${i.email || i.phoneNumber ? 'p-2' : 'p-0'}`}><span>{i.email ?? i.phoneNumber}</span></td>
                    <td className={`text-sm ${i.startedAt ? 'p-2' : 'p-0'}`}><span>{i.startedAt ? formatDateTime(moment(i.startedAt)) : ""}</span></td>
                    <td className={`text-sm ${i.endedAt ? 'p-2' : 'p-0'}`}><span>{i.endedAt ? formatDateTime(moment(i.endedAt)) : ""}</span></td>

                    <td className={`text-sm p-2`}><span>{duration}</span></td>
                    <td className={`text-sm ${i.status ? 'p-2' : 'p-0'}`}><span>{i.status}</span></td>
                </tr>
              )
            })
          }</tbody>
        </table>
      </div>)
      : (
        <p className="text-dark-blue text-md p-2">No Calls made yet</p>
      )
  }
  return (
    <div className="container mx-auto my-5 mb-10">
      <div >

        <h2 className="text-md my-4 ml-3 font-bold leading-tight tracking-tight text-gray-700 md:text-2md text-dark-blue">Latest Calls</h2>
        <LatestCalls />
      </div>
    </div>
  );
}
export default CallHistory