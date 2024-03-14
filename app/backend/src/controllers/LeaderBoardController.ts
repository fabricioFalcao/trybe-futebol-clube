import { Request, Response } from 'express';
import { SeqLeaderBoardService } from '../services';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(private service = new SeqLeaderBoardService()) { }

  public async homeLeaderBoard(_req: Request, res: Response) {
    const { status, data } = await this.service.partialLeaderBoard('home');
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async awayLeaderBoard(_req: Request, res: Response) {
    const { status, data } = await this.service.partialLeaderBoard('away');
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async leaderBoard(_req: Request, res: Response) {
    const { status, data } = await this.service.leaderBoard();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
