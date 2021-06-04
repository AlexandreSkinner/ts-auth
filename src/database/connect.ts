import { createConnection } from 'typeorm';

createConnection()
  .then(() => { 
    console.log('🏃 Successful database connection !!');
   }
   
 ).catch(error => {
    console.log('⛔ ERROR: Database is down !!');
    process.exit();
   }
);