import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

class UserController{
  async index(req: Request, res: Response){
    let rep = getRepository(User);
    return res.status(200).json( await rep.find());
  }

  async store(req: Request, res: Response){
    const repository = getRepository(User);
    const { email, password } = req.body;

    const userExists = await repository.findOne({ where: { email } });

    // Verificar se encontro um usuário com e-mail informado
    if ( userExists) {
      return res.status(409).json( { 
             error: 'User already exists !'
      });  
    }
    // cria a entity
    const user = repository.create({ email, password });

    //save user
    await repository.save(user);

    return res.json(user);
  }
}
export default new UserController();