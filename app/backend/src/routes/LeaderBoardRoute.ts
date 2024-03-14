import { Request, Response, Router } from 'express';
import { LeaderBoardController } from '../controllers';

const controller = new LeaderBoardController();

const router = Router();

router.get('/', (req: Request, res: Response) => controller.leaderBoard(req, res));
router.get('/home', (req: Request, res: Response) => controller.homeLeaderBoard(req, res));
router.get('/away', (req: Request, res: Response) => controller.awayLeaderBoard(req, res));

export default router;
