// import { drizzle } from "drizzle-orm/node-postgres";
// import { Client } from "pg";
// import * as schema from "../model/model"

// export const client=new Client(process.env.DATABASE_URL)

// client.connect().then(()=>{
  
  
// }).catch((err:any)=>{
//  console.error("Error connecting DB : ",err)
  
// });

// const postgresdb = drizzle(client,{schema:{...schema}});


// export default postgresdb

import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL as string);

export default db