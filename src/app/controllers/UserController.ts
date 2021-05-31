import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
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
    if ( userExists) {
      return res.sendStatus(409).json( { error: "Usuário já existe !" });  
    }
    // cria a entity
    const user = repository.create({ email, password });

    //save user
    await repository.save(user);

    return res.json(user);
  }
}
export default new UserController();