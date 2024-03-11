import { NextFunction, Request, Response } from 'express';
import mapFieldValidation from '../utils/mapFiledValidation';
import joiSchema from '../utils/joiSchema';

export default class FieldValidation {
  static loginValidation(req: Request, res: Response, next: NextFunction): Response | void {
    const login = req.body;
    const { error } = joiSchema.loginSchema.validate(login);
    if (error) res.status(mapFieldValidation(error)).json({ message: error.message });
    next();
  }
}
