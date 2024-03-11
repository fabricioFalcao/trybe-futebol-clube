import { Request, Response, Router } from 'express';
import { UserController } from '../controllers';
import FieldValidation from '../middlewares/fieldValidations';

const controller = new UserController();

const router = Router();

router.post(
  '/',
  FieldValidation.loginValidation,
  (req: Request, res: Response) => controller.userLogin(req, res),
);

export default router;
