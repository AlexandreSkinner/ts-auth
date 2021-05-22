import 'reflect-metadata';
import express from 'express';

import './database/connect';
import routes from './routes';

// Criou app express
const app = express();

// middleware a ordem importa
app.use(express.json());
app.use(routes);

app.listen(3000, () => { 
  console.log('🌍 Server started at http://localhost:3000 !!');
});

