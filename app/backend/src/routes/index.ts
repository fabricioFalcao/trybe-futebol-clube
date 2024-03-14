import { Router } from 'express';
import teamRouter from './TeamsRoute';
import userRouter from './UserRoute';
import matchRouter from './MatchRoute';
import leaderBoardRouter from './LeaderBoardRoute';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', userRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
