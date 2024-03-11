import { Request, Response, Router } from 'express';
import userAuthenticator from '../middlewares/userAuthenticator';
import { UserController } from '../controllers';
import FieldValidation from '../middlewares/fieldValidations';

const controller = new UserController();

const router = Router();

router.post(
  '/',
  FieldValidation.loginValidation,
  (req: Request, res: Response) => controller.userLogin(req, res),
);
router.get(
  '/role',
  userAuthenticator,
  (req: Request, res: Response) => controller.userRole(req, res),
);

export default router;
