import { createConnection } from 'typeorm';

createConnection().then(() => { 
  console.log('🏃 Conectado no BD !!');
});