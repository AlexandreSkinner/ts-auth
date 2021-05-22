import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import { PassThrough } from 'stream';

type userDTO = {
  email: string;
  token: string;
};

class AuthController{
  async authenticate(req: Request, res: Response){
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if ( !user) {
      return res.status(401).send(
        {mensagem: ' Usuário não existe !'}
      );  
    }
    
    const isValidPassowrd = await bcrypt.compare(password, user.password);

    // Password divergentes
    if (!isValidPassowrd){
      return res.status(401).send( { 
             mensagem: 'Password invalida !'
      });
    }

    const token = jwt.sign({ id: user.id}, 'secret', { expiresIn: '1d'});
    
    // Eliminar a password do retorno
    let dto: userDTO = { email, token };
    
    return res.json(dto);
  }
}
export default new AuthController();