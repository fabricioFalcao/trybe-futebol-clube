import { Request, Response, Router } from 'express';
import { UserController } from '../controllers';

const controller = new UserController();

const router = Router();

router.post('/', (req: Request, res: Response) => controller.userLogin(req, res));

export default router;
