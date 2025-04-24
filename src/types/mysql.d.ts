import { OkPacket, RowDataPacket, ResultSetHeader, FieldPacket } from 'mysql2';

declare module 'mysql2' {
  interface RowDataPacket {
    [column: string]: any;
  }
  
  interface OkPacket {
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
    changedRows: number;
  }
  
  interface ResultSetHeader extends OkPacket {
    fieldCount: number;
  }
  
  type QueryResult = [RowDataPacket[] | RowDataPacket[][] | ResultSetHeader[] | ResultSetHeader, FieldPacket[]];
  
  interface Pool {
    query<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader[] | ResultSetHeader>(
      sql: string,
      values?: any | any[] | { [param: string]: any }
    ): Promise<[T, FieldPacket[]]>;
    
    execute<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader[] | ResultSetHeader>(
      sql: string,
      values?: any | any[] | { [param: string]: any }
    ): Promise<[T, FieldPacket[]]>;
  }
} 