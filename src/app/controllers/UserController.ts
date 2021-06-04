import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

class UserController{

  // Get - /users
  async index(req: Request, res: Response){
    let rep = getRepository(User);
    return res.status(200).json( await rep.find());
  }
  
  // Post - /users
  async store(req: Request, res: Response){
    const { email, password } = req.body;

    const repository = getRepository(User);    
    const userExists = await repository.findOne({ where: { email } });

    // Verificar se encontrou um user com e-mail informado
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