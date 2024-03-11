import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { SeqTeamService } from '../services';

export default class TeamController {
  constructor(private service = new SeqTeamService()) { }

  public async findAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.service.findAllTeams();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async findTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.service.findTeamById(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
