import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

// userDTO estabelece uma visão para a classe User sem expor a password na API 
type userDTO = {
  email: string;
  token: string;
};

class AuthController{
  async authenticate(req: Request, res: Response){   
    const { email, password } = req.body;
    
    const repository = getRepository(User);
    const user = await repository.findOne({ where: { email } });

    // Verifica se achou um usuário com o e-mail informado
    if ( !user) {
      return res.status(401).json(
        { error: 'Credentials not found !' }
      );  
    }
    
    // Verifica se a senha fornecida é igual a senha cadastrada no BD
    // compare é uma function de bcryptjs - retorna um boolean 
    const isValidPassowrd = await compare(password, user.password);

    // Password divergentes
    if (!isValidPassowrd){
      return res.status(401).json( { 
             error: 'Credentials not found !'
      });
    }

    // Cria o token (payload, secret_key, tempo duração)
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d'});
    
    // Eliminar a password do retorno
    let dto: userDTO = { email, token };
    
    return res.json(dto);
  }
}
export default new AuthController();