import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: string;
  exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction,){
  
  // Retira o token do header
  const { authorization } = req.headers;

  if (!authorization){
    return res.status(401).json({ Erro: "Não tem token"});
  }

  // Retira o Bearer do token substituindo por nda e retira os espaços
  const token = authorization.replace('Bearer', '').trim();
  try { 

    // decodifica o token obtendo as informações do payload
    const data = jwt.verify(token, 'secret');
    const { id } = data as TokenPayload;
    
    // Salvando o ID do user no request
    req.userId = id;
    return next();
  }catch {
    return res.status(401).json({mesagem: "Token mal formado"});
  }
}