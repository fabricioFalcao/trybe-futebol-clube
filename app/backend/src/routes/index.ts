import { Router } from 'express';
import teamRouter from './TeamsRoute';
import userRouter from './UserRoute';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);

export default router;
