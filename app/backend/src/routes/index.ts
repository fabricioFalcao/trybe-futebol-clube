import { Router } from 'express';
import teamsRouter from './TeamsRoute';

const router = Router();

router.use('/teams', teamsRouter);

export default router;
