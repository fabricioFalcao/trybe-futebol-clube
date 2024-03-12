import { Request, Response, Router } from 'express';
import userAuthenticator from '../middlewares/userAuthenticator';
import { MatchController } from '../controllers';

const controller = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => controller.findAllMatches(req, res));
// router.use(userAuthenticator);
router.patch(
  '/:id/finish',
  userAuthenticator,
  (req: Request, res: Response) => controller.finishMatch(req, res),
);
router.patch(
  '/:id',
  userAuthenticator,
  (req: Request, res: Response) => controller.updateMatch(req, res),
);

export default router;
