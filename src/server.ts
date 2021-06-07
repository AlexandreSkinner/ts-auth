import dotenv from "dotenv";
import 'reflect-metadata';
import express from 'express';

import './database/connect';
import routes from './routes';

// Le o .env e adiciona as variáveis ao processo
dotenv.config();

// Criou app express
const app = express();

// middleware a ordem importa
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3002, () => { 
  console.log(`🌍 Server started at http://localhost:${process.env.PORT} !!`);
});