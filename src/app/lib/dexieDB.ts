import Call from '@/models/call';
import Dexie, { Table } from 'dexie';

const dbName = 'urgent_time';

export class DB extends Dexie {
 
    call!: Table<Call>; 

    constructor() {
      super(dbName);
      this.version(1).stores({
        call: '++id, meetingId, userId, email, phoneNumber, startedAt, endedAt, createdAt, updatedAt'  
      });
    }

    static deleteDatabase(): Promise<void> {
      return Dexie.delete(dbName);
    }    
  }
  export const db = new DB();