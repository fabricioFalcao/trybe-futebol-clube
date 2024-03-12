import { Router } from 'express';
import teamRouter from './TeamsRoute';
import userRouter from './UserRoute';
import matchRouter from './MatchRoute';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);

export default router;
