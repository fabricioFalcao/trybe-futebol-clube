import { Request, Response, Router } from 'express';
import { TeamsController } from '../controllers';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsController.findAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.findTeamById(req, res));

export default router;
