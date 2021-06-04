import { createConnection } from 'typeorm';

createConnection()
  .then(() => { 
    console.log('🏃 Conectado no BD !!');
   }
 ).catch(error => {
    console.log('☠️  ERRO: Banco de Dados fora do Ar !!!!'); 
   }
);