import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { SeqTeamsService } from '../services';

export default class TeamsController {
  constructor(private teamsService = new SeqTeamsService()) { }

  public async findAllTeams(_req: Request, res: Response) {
    const { status, data } = await this.teamsService.findAllTeams();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async findTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamsService.findTeamById(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
