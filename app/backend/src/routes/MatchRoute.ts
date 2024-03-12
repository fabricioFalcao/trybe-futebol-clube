import { Request, Response, Router } from 'express';
import { MatchController } from '../controllers';

const controller = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => controller.findAllMatches(req, res));

export default router;
