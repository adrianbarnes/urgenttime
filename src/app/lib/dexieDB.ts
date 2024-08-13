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

    static async deleteDatabase(): Promise<void> {
      try {
        try {
          await db.delete({ disableAutoOpen: false });
          console.log("Database successfully deleted");
        } catch (err) {
          console.error("Could not delete database");
          console.error(err);
        }
      } finally { };
    }    
  }
  export const db = new DB();