import { Request, Response, Router } from 'express';
import { TeamController } from '../controllers';

const controller = new TeamController();

const router = Router();

router.get('/', (req: Request, res: Response) => controller.findAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => controller.findTeamById(req, res));

export default router;
