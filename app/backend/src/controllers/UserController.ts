import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { SeqUserService } from '../services';

export default class UserController {
  constructor(private service = new SeqUserService(), private role = '') { }

  public async userLogin(req: Request, res: Response) {
    const login = req.body;
    const { status, data } = await this.service.userLogin(login);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public userRole(_req: Request, res: Response) {
    this.role = res.locals.decodedData.role;
    return res.status(mapStatusHTTP('SUCCESSFUL')).json({ role: this.role });
  }
}
