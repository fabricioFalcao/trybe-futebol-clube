import { Request, Response, NextFunction } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import jwt from '../utils/jwtTokenUtility';

function userAuthenticator(req: Request, res: Response, next: NextFunction): Response | void {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
  }
  const [, token] = authorization.split(' ');

  try {
    const decodedData = jwt.verify(token);
    res.locals = { decodedData };
    next();
  } catch (error) {
    return res
      .status(mapStatusHTTP('UNAUTHORIZED'))
      .json({ message: 'Token must be a valid token' });
  }
}

export default userAuthenticator;
