import * as joi from 'joi';
import { Login } from '../types/Login';

const blankField = 'All fields must be filled';
const invalidField = 'Invalid email or password';

const loginSchema = joi.object<Login>({
  email: joi.string().email().required().messages({
    'string.empty': blankField,
    'any.required': blankField,
    'string.email': invalidField,
  }),
  password: joi.string().min(6).required().messages({
    'string.empty': blankField,
    'any.required': blankField,
    'string.min': invalidField,
  }),
});

export default {
  loginSchema,
};
