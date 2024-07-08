import Call from '@/models/call';
import Dexie, { Table } from 'dexie';
import appConfig from '@/app/config/app';

const dbName = appConfig.localStorageDatabaseName;

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