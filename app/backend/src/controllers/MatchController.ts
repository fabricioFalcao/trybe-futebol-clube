import { Request, Response } from 'express';
import { SeqMatchService } from '../services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(private service = new SeqMatchService()) { }

  public async findAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const { status, data } = await this.service
      .findAllMatches(inProgress !== undefined ? inProgress === 'true' : undefined);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.service.finishMatch(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const matchNewData = req.body;
    const { status, data } = await this.service.updateMatch(Number(id), matchNewData);
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const newMatch = req.body;
    const { status, data } = await this.service.createMatch(newMatch);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
